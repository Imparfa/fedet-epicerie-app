import {AfterViewInit, Component, Input} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {ManagementService} from "../../../services/management.service";
import {Student} from "../../../models/student";
import {Visit} from "../../../models/visit";

@Component({
  selector: 'app-view-profile-modal',
  templateUrl: './view-profile-modal.component.html',
  styleUrls: ['./view-profile-modal.component.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    DatePipe,
    NgForOf,
    NgIf
  ]
})
export class ViewProfileModalComponent implements AfterViewInit {
  @Input() viewProfileModal: IonModal | undefined;
  @Input() student: Student | null = null;
  visits: Visit[] = [];

  constructor(private managementService: ManagementService) {
  }

  ngAfterViewInit() {
    if (this.student?.email) {
      this.managementService.getVisits(this.student?.email, null, null).subscribe({
        next: (data) => {
          this.visits.push(...data.sort((a: Visit, b: Visit) => {
            return new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime();
          }));
        },
        error: (error) => {
          console.error('Error fetching visits:', error);
        }
      });
    }
  }

  cancel() {
    this.viewProfileModal?.dismiss(null, 'cancel').then();
  }

  getAge(): number {
    if (!this.student?.birthdate) return 0;
    const birthDate = new Date(this.student.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
