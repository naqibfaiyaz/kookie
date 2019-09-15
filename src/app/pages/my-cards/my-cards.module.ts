import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MyCardsPage } from './my-cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [MyCardsPage],
  entryComponents: [
    MyCardsPage,
  ],
  exports: [
    MyCardsPage,
  ],
})
export class MyCardsPageModule {}
