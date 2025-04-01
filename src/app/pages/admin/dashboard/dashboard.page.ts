import {AfterViewInit, Component} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {AuthenticationService} from "../../../services/authentication.service";
import {ManagementService} from "../../../services/management.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  imports: [
    IonicModule,
    NgForOf
  ],
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements AfterViewInit {
  stats = [
    {title: "Nombre d'Adhérants Total", count: 0, icon: 'people'},
    {title: "Nombre de Visit Total", count: 0, icon: 'cart'},
    {title: "Nombre de Visit d'Aujourd'huis", count: 0, icon: 'calendar-number'}
  ];

  constructor(private authService: AuthenticationService, private managementService: ManagementService) {
  }

  logout() {
    this.authService.logout();
  }

  async incrementCount(index: number, count: number) {
    for (let i = 0; i < count; i++) {
      this.stats[index].count++;
      await new Promise(resolve => setTimeout(resolve, 10)); // Simulate delay
    }
  }

  ngAfterViewInit() {
    this.managementService.getStats().subscribe({
      next: (res) => {
        this.incrementCount(0, res.totalStudents);
        this.incrementCount(1, res.totalVisits);
        this.incrementCount(2, res.visitsToday);
      },
      error: (err) => console.error(err),
    });
  }
}
