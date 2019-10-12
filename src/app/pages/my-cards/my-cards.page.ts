import { Component, OnInit } from '@angular/core';
import 'firebase/auth';
import { KookieCoreService } from '../../kookie-core.service';
import { StorageManagerService } from '../../services/storage-manager.service';
import { CommonFunctionsService } from '../../services/common-functions.service';
import { PointsSuccessPage } from '../points-success/points-success.page';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.page.html',
  styleUrls: ['./my-cards.page.scss'],
})
export class MyCardsPage implements OnInit {
  userMeData:any={};
  allCardData:any=[];
  // getUserPoints:any={};
  min_points_to_redeem:any =[];
  constructor(
    private apiService: KookieCoreService,
    private storage: StorageManagerService,
    private router: Router,
    private navCtrl: NavController,
    private commonServices:CommonFunctionsService
  ) { 
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.commonServices.presentLoadingWithOptions();
    let UserData = await this.storage.getObject('user_me_data');
    
    // if(!UserData){
    this.userMeData=await this.apiService.getMe();
    this.userMeData.img = this.apiService.imageUrl + this.userMeData.qr_location;
    this.storage.setObject('user_me_data', this.userMeData);

    this.allCardData = await this.apiService.getAllCards();
    let getUserPoints = await this.apiService.getUserPoints();
    await this.calculatePoints(getUserPoints);
    this.allCardData.sort(function (a, b) {
      if(!a.rewardAvailable){
        a.rewardAvailable=0;
      }

      if(!b.rewardAvailable){
        b.rewardAvailable=0;
      }
      return b.rewardAvailable - a.rewardAvailable;
    });
  };

  goToRewardDetails(item) {
    this.router.navigate(['/points-success', item]);
    
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       data: item
  //     }
  // };

  //   this.navCtrl.navigateForward(['/points-success'], navigationExtras);
  }

  async calculatePoints(getUserPoints) {
      this.allCardData.forEach(element => {
        element.userPointsData=getUserPoints.find(function(getUserPointsElement) {
          return getUserPointsElement.merchant_code===element.merchant_code;
        });
        
        element.logo = this.apiService.imageUrl + element.merchant_image;
        element.icon = this.apiService.imageUrl + element.loyalty_icon;
        
        if(element.userPointsData){
          if(parseInt(element.userPointsData.current_points) >= parseInt(element.min_points_to_redeem)){
            element.rewardAvailable=Math.floor((parseInt(element.userPointsData.current_points))/parseInt(element.min_points_to_redeem));

            element.pointToShow=element.userPointsData.current_points-(element.rewardAvailable*element.min_points_to_redeem);
            element.currentPointsArray = Array(parseInt(element.pointToShow)).fill(0).map((x,i)=>i);
            element.pointsRequired=parseInt(element.min_points_to_redeem)-parseInt(element.pointToShow);
            if(element.pointsRequired>0){
              element.emptyFill = Array(parseInt(element.min_points_to_redeem)-parseInt(element.pointToShow)).fill(0).map((x,i)=>i);
            }
          }else{
            element.pointToShow=element.userPointsData.current_points;
            element.pointsRequired=parseInt(element.min_points_to_redeem)-parseInt(element.userPointsData.current_points);
          }
        }else{
          element.emptyFill = Array(parseInt(element.min_points_to_redeem)).fill(0).map((x,i)=>i);
          element.pointsRequired=parseInt(element.min_points_to_redeem);
          element.pointToShow=0;
        }
      })
  }
}
