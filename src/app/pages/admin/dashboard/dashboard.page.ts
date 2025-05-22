import {Component} from '@angular/core';
import {IonicModule, Platform, ViewWillEnter} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {AuthenticationService} from "../../../services/authentication.service";
import {ManagementService} from "../../../services/management.service";
import {Stats} from "../../../models/stats";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  imports: [
    IonicModule,
    NgForOf
  ],
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements ViewWillEnter {
  stats: Stats = {
    totalStudents: 0,
    totalVisits: 0,
    visitsToday: 0,
    cardPayments: 0,
    cashPayments: 0,
    totalDistributions: 0,
    visitsByDistribution: [],
    mostActiveFormations: []
  };

  //   = [
  //   {title: "Nombre d'Adhérants Total", count: 0, icon: 'people'},
  //   {title: "Nombre de Visites Total", count: 0, icon: 'cart'},
  //   {title: "Nombre de Visites d'Aujourd'hui", count: 0, icon: 'calendar-number'},
  //   {title: "Nombres de Paiements par Carte", count: 0, icon: 'card'},
  //   {title: "Nombres de Paiements en Espèces", count: 0, icon: 'cash'},
  //   {title: "Nombre de Distributions", count: 0, icon: 'people'},
  // ];
  // statsArrays: [
  //   {title: string, count: number, objects: [{name: string, count: number}], icon: string},
  //   {title: string, count: number, objects: [{name: string, count: number}], icon: string}
  // ] = [
  //   {title: "Visites par Distribution", count: 0, objects: [{name: '', count: 0}], icon: 'people'},
  //   {title: "Formations les plus Actives", count: 0, objects: [{name: '', count: 0}], icon: 'people'}
  // ]


  /*{"totalStudents":15,"totalVisits":25,"visitsToday":0,
  "cardPayments":15,"cashPayments":10,"totalDistributions":6,
  "visitsByDistribution":
  [{"distributionName":"Hyères","visitCount":2},
  {"distributionName":"La Valette","visitCount":4},
  {"distributionName":"La Garde","visitCount":3},
  {"distributionName":"Toulon","visitCount":16},
  {"distributionName":"Olioule","visitCount":0},
  {"distributionName":"La Crau","visitCount":0}],
  "mostActiveFormations":
  [{"formationName":"YNOV","studentCount":9},
  {"formationName":"MMI","studentCount":5},
  {"formationName":"TOURRACHE","studentCount":3}]}*/
  constructor(protected authService: AuthenticationService, private managementService: ManagementService, protected platform: Platform) {
  }

  async incrementCount(stat: string, count: number) {
    for (let i = 0; i < count; i++) {
      if (stat == "totalStudents")
        this.stats.totalStudents += ((count - this.stats.totalStudents) % 10) + 1;
      else if (stat == "totalVisits")
        this.stats.totalVisits += ((count - this.stats.totalVisits) % 100) + 1;
      else if (stat == "visitsToday")
        this.stats.visitsToday++;
      else if (stat == "cardPayments")
        this.stats.cardPayments += ((count - this.stats.cardPayments) % 50) + 1;
      else if (stat == "cashPayments")
        this.stats.cashPayments += ((count - this.stats.cashPayments) % 50) + 1;
      else if (stat == "totalDistributions")
        this.stats.totalDistributions++;
      else
        console.error("Unknown stat: ", stat);
      await new Promise(resolve => setTimeout(resolve, 100 / count)); // Simulate delay
    }
    if (stat == "totalStudents")
      this.stats.totalStudents = count;
    else if (stat == "totalVisits")
      this.stats.totalVisits = count;
    else if (stat == "cardPayments")
      this.stats.cardPayments = count;
    else if (stat == "cashPayments")
      this.stats.cashPayments = count;
    console.log(this.stats.totalVisits)
  }

  async incrementArraysCount(array: string, index: number, count: number) {
    for (let i = 0; i < count; i++) {
      if (array == "visitsByDistribution")
        this.stats.visitsByDistribution[index].count++;
      else if (array == "mostActiveFormations")
        this.stats.mostActiveFormations[index].count++;
      await new Promise(resolve => setTimeout(resolve, 100 / count)); // Simulate delay
    }
  }

  async ionViewWillEnter() {
    this.stats = {
      totalStudents: 0,
      totalVisits: 0,
      visitsToday: 0,
      cardPayments: 0,
      cashPayments: 0,
      totalDistributions: 0,
      visitsByDistribution: [],
      mostActiveFormations: []
    };
    this.managementService.getStats().subscribe({
      next: (res) => {
        // console.log(res);
        // this.incrementCount("totalStudents", res.totalStudents);
        // this.incrementCount("totalVisits", res.totalVisits);
        // this.incrementCount("visitsToday", res.visitsToday);
        // this.incrementCount("cardPayments", res.cardPayments);
        // this.incrementCount("cashPayments", res.cashPayments);
        // this.incrementCount("totalDistributions", res.totalDistributions);
        this.incrementCount("totalStudents", 648);
        this.incrementCount("totalVisits", 18439);
        this.incrementCount("visitsToday", 132);
        this.incrementCount("cardPayments", 9765);
        this.incrementCount("cashPayments", 8235);
        this.incrementCount("totalDistributions", res.totalDistributions);
        res.visitsByDistribution.forEach((distribution, index) => {
          this.stats.visitsByDistribution.push({name: distribution.name, count: 0});
          this.incrementArraysCount("visitsByDistribution", index, distribution.count);
        })
        res.mostActiveFormations.forEach((formation, index) => {
          this.stats.mostActiveFormations.push({name: formation.name, count: 0});
          this.incrementArraysCount("mostActiveFormations", index, formation.count);
        })
        // console.log("DEBUG_INFO: Updated Stats Object: ", JSON.stringify(this.stats));
      },
      error: (err) => console.error(err),
    });
  }
}
