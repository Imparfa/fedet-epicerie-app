import {Component} from '@angular/core';
import {IonicModule, Platform, ViewWillEnter} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {AuthenticationService} from "../../../services/authentication.service";
import {ManagementService} from "../../../services/management.service";
import {Stats} from "../../../models/stats";
import {FormsModule} from "@angular/forms";
import {Distribution} from "../../../models/distribution";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  imports: [
    IonicModule,
    NgForOf,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements ViewWillEnter {
  stats: Stats | any = {
    totalStudents: 0,
    totalVisits: 0,
    visitsToday: 0,
    cardPayments: 0,
    cashPayments: 0,
    totalDistributions: 0,
    totalFormations: 0,
    visitsByDistribution: [],
    mostActiveFormations: []
  };

  distributions: string[] = [];
  years: string[] = [
    new Date().getFullYear().toString(),
    (new Date().getFullYear() - 1).toString(),
    (new Date().getFullYear() - 2).toString(),
    (new Date().getFullYear() - 3).toString(),
    (new Date().getFullYear() - 4).toString(),
    (new Date().getFullYear() - 5).toString()
  ];
  months: { value: string, label: string }[] = [
    {value: '01', label: 'Janvier'},
    {value: '02', label: 'Février'},
    {value: '03', label: 'Mars'},
    {value: '04', label: 'Avril'},
    {value: '05', label: 'Mai'},
    {value: '06', label: 'Juin'},
    {value: '07', label: 'Juillet'},
    {value: '08', label: 'Août'},
    {value: '09', label: 'Septembre'},
    {value: '10', label: 'Octobre'},
    {value: '11', label: 'Novembre'},
    {value: '12', label: 'Décembre'}
  ];

  selectedDistribution: string = '';
  selectedYear: string = ''; // Format YYYY
  selectedMonth: string = ''; // Format YYYY-MM

  constructor(protected authService: AuthenticationService, private managementService: ManagementService, protected platform: Platform) {
  }

  async ionViewWillEnter() {
    await this.updateStats();
  }

  animateStats(targetStats: any | Stats) {
    const duration = 1000;
    const frameRate = 30;
    const totalFrames = duration / (1000 / frameRate);

    const keys = [
      'visitsToday',
      'totalStudents',
      'totalVisits',
      'cardPayments',
      'cashPayments',
      'totalDistributions',
      'totalFormations'
    ];

    keys.forEach(key => {
      const finalValue = targetStats[key];
      const increment = finalValue / totalFrames;
      let currentValue = 0;
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          this.stats[key] = finalValue;
          clearInterval(interval);
        } else {
          this.stats[key] = Math.round(currentValue);
        }
      }, 1000 / frameRate);
    });

    // Données directes (pas besoin d'animer les tableaux)
    this.stats.visitsByDistribution = targetStats.visitsByDistribution;
    this.stats.mostActiveFormations = targetStats.mostActiveFormations;
  }

  async onDistributionChange(event: any) {
    this.selectedDistribution = event.target.value;
    await this.updateStats();
  }

  async onYearChange(event: any) {
    this.selectedYear = event.target.value;
    await this.updateStats();
  }

  async onMonthChange(event: any) {
    this.selectedMonth = event.target.value;
    await this.updateStats();
  }

  async cleanFilters() {
    this.selectedDistribution = '';
    this.selectedYear = '';
    this.selectedMonth = '';
    await this.updateStats();
  }

  async updateStats() {
    this.managementService.getStats(this.selectedMonth, this.selectedYear).subscribe({
      next: (res) => {
        this.animateStats(res);
      },
      error: (err) => {
        console.error('Erreur de récupération des stats :', err);
      }
    });
    this.managementService.getDistributions().subscribe({
      next: (res: Distribution[]) => {
        this.distributions = res.map(d => d.name);
      },
      error: (err) => {
        console.error('Erreur de récupération des distributions :', err);
      }
    });
  }
}
