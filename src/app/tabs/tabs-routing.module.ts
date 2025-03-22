import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {RoleGuard} from "../guards/role.guard";

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'student',
        canActivate: [RoleGuard],
        data: { expectedRole: 'STUDENT' },
        children: [
          { path: 'profile', loadChildren: () => import('../pages/student/profile/profile.module').then(m => m.ProfilePageModule) },
          { path: '', redirectTo: 'profile', pathMatch: 'full' }
        ]
      },
      {
        path: 'admin',
        canActivate: [RoleGuard],
        data: { expectedRole: 'ADMIN' },
        children: [
          { path: 'dashboard', loadChildren: () => import('../pages/admin/dashboard/dashboard.module').then(m => m.DashboardPageModule) },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
