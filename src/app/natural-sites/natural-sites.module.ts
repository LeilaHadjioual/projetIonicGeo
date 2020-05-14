import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NaturalSitesPageRoutingModule } from './natural-sites-routing.module';

import { NaturalSitesPage } from './natural-sites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NaturalSitesPageRoutingModule
  ],
  declarations: [NaturalSitesPage]
})
export class NaturalSitesPageModule {}
