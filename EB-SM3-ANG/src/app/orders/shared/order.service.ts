import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Order} from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };

  constructor(private http: HttpClient) { }

  getAllOrders(filter: string): Observable<any>{
    this.setToken();
    return this.http.get<Observable<any>>(environment.apiUrl + '/order' + filter, this.httpOptions);
  }

  getOrdersFromCustomer(customerID: number, filter: string): Observable<any>{
    this.setToken();
    return this.http.get<Observable<any>>(environment.apiUrl + '/order/customer-' + customerID + filter, this.httpOptions);
  }

  readOrderByIDUser(orderID: number, userID: number): Observable<Order>{
    this.setToken();
    return this.http.get<Order>(environment.apiUrl + '/order/' + orderID + '/' + userID, this.httpOptions);
  }

  readOrderByID(orderID: number): Observable<Order>{
    this.setToken();
    return this.http.get<Order>(environment.apiUrl + '/order/' + orderID, this.httpOptions);
  }

  updateOrderStatus(orderID: number): Observable<Order>{
    this.setToken();
    return this.http.put<Order>(environment.apiUrl + '/order/' + orderID, this.httpOptions);
  }

  setToken(): void{
    //  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'bearer ' + this.authService.getToken());
  }
}
