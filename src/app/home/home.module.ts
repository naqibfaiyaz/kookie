import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { HomePage } from './home.page';
import { MyCardsPageModule } from './../pages/my-cards/my-cards.module';
import { MyOffersPageModule } from './../pages/my-offers/my-offers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule,
    MyCardsPageModule,
    MyOffersPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
