import {Component, ViewChild} from '@angular/core';
import {IonicModule, IonModal, ViewWillEnter} from "@ionic/angular";
import {Visit} from "../../../models/visit";
import {ManagementService} from "../../../services/management.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ViewProfileModalComponent} from "../../../components/admin/view-profile-modal/view-profile-modal.component";
import {Student} from "../../../models/student";

@Component({
  selector: 'app-visits',
  templateUrl: './visits.page.html',
  styleUrls: ['./visits.page.scss'],
  imports: [
    IonicModule,
    DatePipe,
    FormsModule,
    NgForOf,
    NgIf,
    ViewProfileModalComponent
  ]
})
export class VisitsPage implements ViewWillEnter {
  @ViewChild("viewStudentModal") viewStudentModal: IonModal | undefined;
  visits: Visit[] = [];
  searchQuery: string = '';
  selectedStudent: Student | null = null;

  private startDate: Date = new Date(); // today
  private dayWindow = 240; // fetch 30 days per scroll
  private loading = false;
  protected allLoaded = false;

  constructor(private managementService: ManagementService) {
  }

  ionViewWillEnter() {
    this.loadMoreVisits();
  }

  async loadMoreVisits(event?: any) {
    if (this.allLoaded) {
      if (event) event.target.complete();
      return;
    }

    this.loading = true;

    const end = new Date(this.startDate);
    const start = new Date(this.startDate);
    start.setDate(start.getDate() - this.dayWindow);

    const format = (d: Date): string => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const startDateStr = format(start);
    const endDateStr = format(end);

    this.managementService.getVisits(null, startDateStr, endDateStr).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.allLoaded = true;
        } else {
          this.visits.push(...data.sort((a: Visit, b: Visit) => {
            return new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime();
          }));
          this.startDate = start;
        }

        this.loading = false;
        if (event) event.target.complete();
      },
      error: () => {
        this.loading = false;
        if (event) event.target.complete();
      }
    });
  }

  viewStudent(student: Student) {
    this.selectedStudent = student;
    this.viewStudentModal?.present();
  }

  filterVisits(): Visit[] {
    const query = this.searchQuery.toLowerCase();
    return this.visits.filter(v =>
      `${v.student.firstname} ${v.student.lastname}`.toLowerCase().includes(query) ||
      v.student.email.toLowerCase().includes(query)
    );
  }
}
