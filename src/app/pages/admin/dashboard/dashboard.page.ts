import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  imports: [
    IonicModule,
    NgForOf
  ],
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  stats = [
    { title: 'Total Utilisateurs', count: 120, icon: 'people' },
    { title: 'Achats Réalisés', count: 45, icon: 'cart' },
    { title: 'Produits Disponibles', count: 350, icon: 'pricetag' }
  ];

  constructor(private authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {}
}
