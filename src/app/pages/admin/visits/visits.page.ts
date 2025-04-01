import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Visit} from "../../../models/visit";
import {ManagementService} from "../../../services/management.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-visits',
  templateUrl: './visits.page.html',
  styleUrls: ['./visits.page.scss'],
  imports: [
    IonicModule,
    DatePipe,
    FormsModule,
    NgForOf,
    NgIf
  ]
})
export class VisitsPage implements OnInit {
  visits: Visit[] = [];
  searchQuery: string = '';

  private startDate: Date = new Date(); // today
  private dayWindow = 30; // fetch 30 days per scroll
  private loading = false;
  protected allLoaded = false;

  constructor(private managementService: ManagementService) {
  }

  ngOnInit() {
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

    this.managementService.getVisits(startDateStr, endDateStr).subscribe({
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

  filterVisits(): Visit[] {
    const query = this.searchQuery.toLowerCase();
    return this.visits.filter(v =>
      `${v.student.firstname} ${v.student.lastname}`.toLowerCase().includes(query) ||
      v.student.email.toLowerCase().includes(query)
    );
  }
}
