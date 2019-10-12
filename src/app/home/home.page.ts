import { PopoverComponent } from './../component/popover/popover.component';
import { AfterViewInit, Component, ViewChild  } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { MyCardsPage } from '../pages/my-cards/my-cards.page';
import { MyOffersPage } from '../pages/my-offers/my-offers.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  public user: any = {};
  @ViewChild(SuperTabs, { static: false }) superTabs: SuperTabs;

  MyCardsPage = MyCardsPage;
  MyOffersPage = MyOffersPage;

  ngAfterViewInit() {
    // this.superTabs.selectTab(0);
  }
  constructor(
    public popoverController: PopoverController,
    public alertCtrl: AlertController
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

    public config = {
      // maxDragAngle: 40,
      // dragThreshold: 20,
      // allowElementScroll: true,
      // transitionDuration: 150,
      // sideMenu: 'left',
      // sideMenuThreshold: 50,
      // shortSwipeDuration: 260
   };
}
