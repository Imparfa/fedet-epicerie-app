import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CashRegisterPage} from './cash-register.page';

const routes: Routes = [
  {
    path: '',
    component: CashRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashRegisterPageRoutingModule {
}
