import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CulturalSitesPageRoutingModule } from './cultural-sites-routing.module';

import { CulturalSitesPage } from './cultural-sites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CulturalSitesPageRoutingModule
  ],
  declarations: [CulturalSitesPage]
})
export class CulturalSitesPageModule {}
