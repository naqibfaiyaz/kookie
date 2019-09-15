import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PointsHistoryPage } from './points-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [PointsHistoryPage],
  entryComponents: [
    PointsHistoryPage,
  ],
  exports: [
    PointsHistoryPage,
  ],
})
export class PointsHistoryPageModule {}
