import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Order} from './order';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAllOrders(filter: string): Observable<any>{
    return this.http.get<Observable<any>>(environment.apiUrl + '/order' + filter);
  }

  getOrdersFromCustomer(customerID: number, filter: string): Observable<any>{
    return this.http.get<Observable<any>>(environment.apiUrl + '/order/customer-' + customerID + filter);
  }

  readOrderByIDUser(orderID: number, userID: number): Observable<Order>{
    return this.http.get<Order>(environment.apiUrl + '/order/' + orderID + '/' + userID);
  }

  readOrderByID(orderID: number): Observable<Order>{
    return this.http.get<Order>(environment.apiUrl + '/order/' + orderID);
  }

  updateOrderStatus(orderID: number): Observable<Order>{
    return this.http.put<Order>(environment.apiUrl + '/order/' + orderID, null);
  }

}
