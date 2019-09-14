import { Component } from '@angular/core';
import { AuthService } from '../services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public loading: HTMLIonLoadingElement;
  constructor(
    private authService: AuthService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private router: Router,
    ) {}

  async logoutUser(){
    this.loading = await this.loadingCtrl.create();
    
    firebase.auth().signOut().then(
      () => {
        this.loading.dismiss().then(() => {
          this.router.navigateByUrl('');
        });
      },
      error => {
        this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await alert.present();
        });
      }
    )};
    
}
