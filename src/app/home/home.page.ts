import { PopoverComponent } from './../component/popover/popover.component';
import { Component } from '@angular/core';
import { PopoverController, AlertController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any = {};
  public loading: HTMLIonLoadingElement;
  constructor(
    public popoverController: PopoverController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    ) {
      this.user=firebase.auth().currentUser.providerData[0];
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
