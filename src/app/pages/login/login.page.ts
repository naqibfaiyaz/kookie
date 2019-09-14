import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController } from "@ionic/angular";
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
    private loadingCtrl: LoadingController
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
        this.navCtrl.navigateForward("/home");
      }
    });
  }

  async facebookLogin() {
    console.log("facebook login");
    await this.showLoading();
    this.authService.loginWithFacebook().then(resp =>{
      this.loading.dismiss();
    });
  }

  async googleLogin() {
    console.log("Google login");
    await this.showLoading();
    this.authService.loginWithGoogle().then(resp =>{
      this.loading.dismiss();
    });
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Authenticating...",
      duration: 5000
    });

    this.loading.present();
  }

  GoToHome(){
    location.href='/home';
  };
}
