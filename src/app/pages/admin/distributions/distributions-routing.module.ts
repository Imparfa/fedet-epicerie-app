import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DistributionsPage} from './distributions.page';

const routes: Routes = [
  {
    path: '',
    component: DistributionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DistributionsPageRoutingModule {
}
