import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  public loading: HTMLIonLoadingElement;
  constructor(
    public authService: AuthService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private router: Router,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {}

  async logoutUser(){
    this.loading = await this.loadingCtrl.create();
    
    this.authService.logoutUser().then(
      (success) => {
        console.log(success);
        this.loading.dismiss().then(() => {
          this.popoverController.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
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
