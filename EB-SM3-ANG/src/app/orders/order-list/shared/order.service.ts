import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Order} from '../../../shared/services/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };

  constructor(private http: HttpClient) { }

  getOrdersFromCustomer(customerID: number, filter: string): Observable<any>{
    return this.http.get<Observable<any>>(environment.apiUrl + '/order/customer-' + customerID + filter, this.httpOptions);
  }

  ReadOrderByIDUser(orderID: number, userID: number): Observable<Order>{
    return this.http.get<Order>(environment.apiUrl + '/order/' + orderID + '/' + userID, this.httpOptions);
  }

  ReadOrderByID(orderID: number): Observable<Order>{
    return this.http.get<Order>(environment.apiUrl + '/order/' + orderID, this.httpOptions);
  }

  setToken(): void{
    //  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'bearer ' + this.authService.getToken());
  }
}
