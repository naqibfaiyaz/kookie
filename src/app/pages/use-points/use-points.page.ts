import { Component, OnInit } from '@angular/core';
import { KookieCoreService } from '../../kookie-core.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-use-points',
  templateUrl: './use-points.page.html',
  styleUrls: ['./use-points.page.scss'],
})
export class UsePointsPage implements OnInit {
  public item: any;
  public redeemableOffers: any;
  public redeemOffers: any;
  constructor(
    private route: ActivatedRoute,
    private apiService: KookieCoreService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.item = {
        merchant_code: params["merchant_code"]
      };
    });
  }

  async ionViewWillEnter() {
    this.redeemableOffers=await this.apiService.getAvailableRedeemOffers(this.item.merchant_code);
  };

  async redeemPoints(id){
    this.redeemOffers=await this.apiService.redeemOffer(id);
  }
}
