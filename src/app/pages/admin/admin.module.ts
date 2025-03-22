import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

// Pages ADMIN
import { DashboardPage } from './dashboard/dashboard.page';
// import { RegisterPage } from './register/register.page';
// import { StudentsManagementPage } from './students/students.page';

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
    path: 'register',
    // component: RegisterPage
  },
  {
    path: 'students',
    // component: StudentsManagementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DashboardPage,
    // RegisterPage,
    // StudentsManagementPage
  ],
  declarations: []
})
export class AdminPageModule {}
