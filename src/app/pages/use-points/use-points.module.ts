import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsePointsPage } from './use-points.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [UsePointsPage],
  entryComponents: [
    UsePointsPage,
  ],
  exports: [
    UsePointsPage,
  ]
})
export class UsePointsPageModule {}
