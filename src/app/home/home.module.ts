import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: 'my_card',
            children: [
              {
                path: '',
                loadChildren: '../pages/my-cards/my-cards.module#MyCardsPageModule'
              }
            ]
          },
          {
            path: 'history',
            loadChildren: '../pages/points-history/points-history.module#PointsHistoryPageModule',
          }
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
