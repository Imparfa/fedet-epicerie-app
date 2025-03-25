import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';

// Pages ADMIN
import {DashboardPage} from './dashboard/dashboard.page';
import {CashRegisterPage} from "./cash-register/cash-register.page";
import {StudentsPage} from "./students/students.page";
import {VisitsPage} from "./visits/visits.page";
import {DistributionsPage} from "./distributions/distributions.page";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardPage
  },
  {
    path: 'distributions',
    component: DistributionsPage
  },
  {
    path: 'cash-register',
    component: CashRegisterPage
  },
  {
    path: 'students',
    component: StudentsPage
  },
  {
    path: 'visits',
    component: VisitsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: []
})
export class AdminPageModule {}
