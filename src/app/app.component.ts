import { Component, QueryList, ViewChildren } from '@angular/core';
import { Plugins } from '@capacitor/core';

import { Platform, IonRouterOutlet, ModalController, MenuController, ActionSheetController, PopoverController, AlertController } from '@ionic/angular';
const { SplashScreen, StatusBar } = Plugins;
import { CommonFunctionsService } from './services/common-functions.service';

import { AuthService } from './services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private authService: AuthService,
    private platform: Platform,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private router: Router,
    private toast: AlertController,
    private commonServices:CommonFunctionsService
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.authService.init();

    this.platform.ready().then(() => {
      SplashScreen.hide().catch(error => {
        console.error(error);
      });

      StatusBar.hide().catch(error => {
        console.error(error);
      });
    });
  }
// active hardware back button
backButtonEvent() {
  this.platform.backButton.subscribe(async () => {
      // close action sheet
      try {
          const element = await this.actionSheetCtrl.getTop();
          if (element) {
              element.dismiss();
              return;
          }
      } catch (error) {
      }

      // close popover
      try {
          const element = await this.popoverCtrl.getTop();
          if (element) {
              element.dismiss();
              return;
          }
      } catch (error) {
      }

      // close modal
      try {
          const element = await this.modalCtrl.getTop();
          if (element) {
              element.dismiss();
              return;
          }
      } catch (error) {
          console.log(error);

      }

      // close side menua
      try {
          const element = await this.menu.getOpen();
          if (element !== null) {
              this.menu.close();
              return;

          }

      } catch (error) {

      }

      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          if (outlet && outlet.canGoBack()) {
              outlet.pop();

          } else if (this.router.url === '/home') {
              if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                  // this.platform.exitApp(); // Exit from app
                  navigator['app'].exitApp(); // work for ionic 4

              } else {
                  this.commonServices.presentToast('Press back again to exit App.');
                  this.lastTimeBackPress = new Date().getTime();
              }
          }
      });
  });
}
}
