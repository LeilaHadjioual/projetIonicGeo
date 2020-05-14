import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {QuizBannerComponent} from '../quiz-banner/quiz-banner.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule
    ],
    exports: [
        QuizBannerComponent
    ],
    declarations: [HomePage, QuizBannerComponent]
})
export class HomePageModule {}
