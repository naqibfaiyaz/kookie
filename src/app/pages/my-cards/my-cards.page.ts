import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.page.html',
  styleUrls: ['./my-cards.page.scss'],
})
export class MyCardsPage implements OnInit {
  qrCodeData: any = {};
  constructor(
    private httpClient: HttpClient
  ) { 
  }

  ngOnInit() {
  }

  // ionViewWillEnter() {
  //   this.getQRCode();
    
  //   console.log(this.qrCodeData);
  //   this.qrCodeData.img = "http://localhost:8002/" + this.qrCodeData.QRCodeURL;
  //   this.qrCodeData.userID = this.qrCodeData.userID;
  // }

  async ionViewWillEnter() {
    let token=await firebase.auth().currentUser.getIdToken();
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    this.qrCodeData = await this.httpClient.get("http://localhost:8002/api/me", { headers: headers }).toPromise();
    
    this.qrCodeData.img = "http://localhost:8002/" + this.qrCodeData.QRCodeURL;
    this.qrCodeData.userID = this.qrCodeData.userID;

  }
}
