import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Visit} from "../../../models/visit";
import {ManagementService} from "../../../services/management.service";
import {DatePipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-visits',
  templateUrl: './visits.page.html',
  styleUrls: ['./visits.page.scss'],
  imports: [
    IonicModule,
    DatePipe,
    FormsModule,
    NgForOf
  ]
})
export class VisitsPage implements OnInit {
  visits: Visit[] = [];
  searchQuery: string = '';

  constructor(private managementService: ManagementService) {
  }

  ngOnInit() {
    this.loadVisits();
  }

  loadVisits() {
    this.managementService.getVisits().subscribe({
      next: (data: any[]) => {
        this.visits = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      error: (err: any) => console.error(err),
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
