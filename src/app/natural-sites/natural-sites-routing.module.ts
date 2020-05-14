import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaturalSitesPage } from './natural-sites.page';

const routes: Routes = [
  {
    path: '',
    component: NaturalSitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NaturalSitesPageRoutingModule {}
