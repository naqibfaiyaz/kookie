import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController, AlertController } from "@ionic/angular";
import { AuthService } from "../../services/user/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  private loading;
  sliderOne: any;
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  constructor(
    public authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1,
            name: "coffee-cup",
            type: "svg",
            title: 'Eat & Earn',
            body: 'Show your QR code at your favorite restaurants when paying to earn stars.'
          },
          {
            id: 2,
            name: "Diamond",
            type: "svg",
            image: '../../assets/images/slide-2.png',
            title: 'Claim',
            body: 'Use your stars to receive free gifts from your frequented restaurants.'
          },
          {
            id: 3,
            name: "Rewards",
            type: "svg",
            image: '../../assets/images/slide-3.png',
            title: 'Repeat',
            body: 'Continue visiting your favorite places to keep earning rewards!'
          },
          {
            id: 4,
            name: "security",
            type: "svg",
            image: '../../assets/images/slide-4.png',
            title: 'Verify your mobile mumber',
            body: 'An OTP has been sent to your number. Enter to continue'
          }
        ]
      };
  }

  async ngOnInit() {
    await this.showLoading();
    console.log("ngOnInit");
    this.authService.loggedIn.subscribe(status => {
      this.loading.dismiss();
      
      if (status) {
        this.navCtrl.navigateForward("/");
      }
    });
  }

  async facebookLogin() {
    try{
      await this.showLoading();
      let resp = await this.authService.loginWithFacebook();
      console.log("facebook Login Successful: " + JSON.stringify(resp));
        if(resp.code=="auth/account-exists-with-different-credential"){
          this.newAlert("An account already exists with the same email address. Please try with Google Sign-in.");
        }

        if(resp){
          await this.loading.dismiss();
        }
        return resp;
    }catch(error){
      console.log("facebook login failed: " + error);
      return error
    }
    
  }

  async newAlert(alertText){
    const alert = await this.alertCtrl.create({
      message: alertText,
      buttons: [{ text: 'Ok', role: 'cancel' }],
    });
    await alert.present();
  }
  
  async googleLogin() {
    try{
      await this.showLoading();
      const resp = await this.authService.loginWithGoogle();
      if(resp && resp.code=="auth/account-exists-with-different-credential"){
        this.newAlert("An account already exists with the same email address. Please try with Google Sign-in.");
      }
      if(resp){
        await this.loading.dismiss();
      }
      console.log("Google Login Successful: " + JSON.stringify(resp));
      return resp;
    }catch(error){
      console.log("Google login failed: " + error);
      return error
    }
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Loading. Please Wait...",
      duration: 10000
    });

    this.loading.present();
  }
}
