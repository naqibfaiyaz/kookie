import { PopoverComponent } from './../component/popover/popover.component';
import { AfterViewInit, Component, ViewChild  } from '@angular/core';
import { PopoverController, AlertController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { MyCardsPage } from '../pages/my-cards/my-cards.page';
import { PointsHistoryPage } from '../pages/points-history/points-history.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  private user: any = {};
  public loading: HTMLIonLoadingElement;
  @ViewChild(SuperTabs, { static: false }) superTabs: SuperTabs;

  MyCardsPage = MyCardsPage;
  PointsHistoryPage = PointsHistoryPage;

  ngAfterViewInit() {
    console.log('Super tabs is ', this.superTabs);
    this.superTabs.selectTab(0);
  }
  constructor(
    public popoverController: PopoverController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    ) {
      this.user = firebase.auth().currentUser.providerData[0];
    }

    async presentPopover(ev: any) {
      const popover = await this.popoverController.create({
        component: PopoverComponent,
        event: ev,
        translucent: true
      });

      return await popover.present();
    }
}
