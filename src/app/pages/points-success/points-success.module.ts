import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { UsePointsPageModule } from './../use-points/use-points.module';
import { PointsHistoryPageModule } from './../points-history/points-history.module';
import { IonicModule } from '@ionic/angular';

import { PointsSuccessPage } from './points-success.page';

const routes: Routes = [
  {
    path: '',
    component: PointsSuccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule,
    UsePointsPageModule,
    PointsHistoryPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: PointsSuccessPage
      }
    ])
  ],
  declarations: [PointsSuccessPage]
})
export class PointsSuccessPageModule {}
