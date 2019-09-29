import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable } from  'rxjs';
import { map } from 'rxjs/operators';
import { StorageManagerService } from './services/storage-manager.service'

@Injectable({
  providedIn: 'root'
})
export class KookieCoreService {
  baseUrl:string = "http://192.168.10.10/user/api/";
  imageUrl:string = "http://192.168.10.10/";
  token:any={};
constructor(
    private  httpClient : HttpClient,
    private  storage : StorageManagerService
  ) { }

// Sending a GET request to /products

public async getMe(): Promise<any> {
  this.token=await this.storage.getItem('jwt_token');

  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token.value,
  });
  return this.httpClient.get(this.baseUrl + 'me', { headers: headers }).toPromise();
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
