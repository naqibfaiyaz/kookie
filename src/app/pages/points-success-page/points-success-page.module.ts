import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PointsSuccessPagePage } from './points-success-page.page';

const routes: Routes = [
  {
    path: '',
    component: PointsSuccessPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PointsSuccessPagePage]
})
export class PointsSuccessPagePageModule {}
