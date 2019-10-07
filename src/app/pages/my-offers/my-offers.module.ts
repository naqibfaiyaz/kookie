
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOffersPage } from './my-offers.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [MyOffersPage],
  entryComponents: [
    MyOffersPage,
  ],
  exports: [
    MyOffersPage,
  ],
})
export class MyOffersPageModule {}
