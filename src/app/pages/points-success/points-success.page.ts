import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SuperTabs } from '@ionic-super-tabs/angular';
import { UsePointsPage } from '../use-points/use-points.page';
import { PointsHistoryPage } from '../points-history/points-history.page';
import { KookieCoreService } from 'src/app/kookie-core.service';

@Component({
  selector: 'app-points-success',
  templateUrl: './points-success.page.html',
  styleUrls: ['./points-success.page.scss'],
})
export class PointsSuccessPage implements AfterViewInit, OnInit {
  public item: any;

  @ViewChild(SuperTabs, { static: false }) superTabs: SuperTabs;
  constructor(
    private route: ActivatedRoute,
    private apiService: KookieCoreService,
    ) { }

  UsePointsPage = UsePointsPage;
  PointsHistoryPage = PointsHistoryPage;

  ngAfterViewInit() {
    // this.superTabs.selectTab(0);
  }

  ngOnInit() {
    // Receive Parameter
    this.route.params.subscribe(params => {
      this.item = {
        id: params["id"],
        merchant_name: params["merchant_name"],
        description: params["description"],
        merchant_code: params["merchant_code"],
        point_type: params["point_type"],
        loyalty_icon: this.apiService.imageUrl + params["loyalty_icon"],
        loyalty_text: params["loyalty_text"],
        offerings: params["offerings"],
        rewardAvailable: params["rewardAvailable"],
        pointToShow: params["pointToShow"],
        min_points_to_redeem: params["min_points_to_redeem"],
        currentPointsArray: params["currentPointsArray"].split(","),
        pointsRequired: params["pointsRequired"],
        emptyFill: params["emptyFill"].split(","),
        userPointsData: params["userPointsData"],
      };
  });
  }
}
