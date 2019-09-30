import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { KookieCoreService } from '../../kookie-core.service';
import { StorageManagerService } from '../../services/storage-manager.service'

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.page.html',
  styleUrls: ['./my-cards.page.scss'],
})
export class MyCardsPage implements OnInit {
  results:any={};
  constructor(
    private apiService: KookieCoreService,
    private storage: StorageManagerService
  ) { 
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    let UserData = await this.storage.getObject('user_me_data');
    
    if(!UserData){
      this.apiService.getMe().then(result => {
        this.results = result;
        this.results.img = this.apiService.imageUrl + this.results.qr_location;
        this.storage.setObject('user_me_data', this.results);
      });
    }else{
      this.results=UserData;
    }
    
    // this.qrCodeData = await this.httpClient.get(backend.host + "api/me", { headers: headers }).toPromise();
    // this.qrCodeData.img = backend.host + this.qrCodeData.qr_location;
  }
}
