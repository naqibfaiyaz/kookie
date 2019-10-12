import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageManagerService } from './services/storage-manager.service'
import { backend} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class KookieCoreService {
  params = {};
  public baseUrl:string = backend.host + "/user/api/";
  public imageUrl:string = backend.host + "/";
  
constructor(
    private  httpClient : HttpClient,
    private  storage : StorageManagerService
  ) { }

// Sending a GET request to /products

public async getMe(): Promise<any> {
  let token=await this.storage.getItem('jwt_token');
  
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token.value,
  });
  return this.httpClient.get(this.baseUrl + 'me', { headers: headers}).toPromise();
}

public async getAllCards(): Promise<any> {
  let token=await this.storage.getItem('jwt_token');

  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token.value,
  });
  return this.httpClient.get(this.baseUrl + 'getAllCardData', { headers: headers }).toPromise();
}

public async getUserPoints(): Promise<any> {
  let token=await this.storage.getItem('jwt_token');

  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token.value,
  });
  return this.httpClient.get(this.baseUrl + 'getUserPoints', { headers: headers }).toPromise();
}
// Sending a POST request to /products

// public  createProduct(product: Product) {

// }

// // Sending a GET request to /products/:id

// public  getProductById(productId: number) {

// }

// // Sending a PUT request to /products/:id

// public  updateProduct(product: Product){

// }

// // Sending a DELETE request to /products/:id

// public  deleteProductById(productId: number) {

// }

}
