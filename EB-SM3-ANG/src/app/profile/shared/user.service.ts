import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Brand} from '../../product/brands/shared/brand';
import {Customer} from './customer';
import {User} from './user';
import {Order} from '../../orders/shared/order';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };

  constructor(private http: HttpClient) { }

  purchaseCart(order: Order): Observable<Order>{
    this.setToken();
    return this.http.post<Order>(environment.apiUrl + '/order/', order, this.httpOptions);
  }

  register(username: string, password: string): Observable<boolean>{
    this.setToken();
    return this.http.post<any>(environment.apiUrl + '/user', {username, password}, this.httpOptions)
      .pipe(map(response => {
        if (response.id !== 0) {return true;}
        else {return false;}
      }));
  }

  getUserById(id: number): Observable<User>{
    this.setToken();
    return this.http.get<User>(environment.apiUrl + '/user/' + id, this.httpOptions);
  }

  getCustomerById(id: number): Observable<Customer>{
    this.setToken();
    return this.http.get<Customer>(environment.apiUrl + '/customer/' + id, this.httpOptions);
  }

  createUserCustomer(customer: Customer): Observable<Customer>{
    this.setToken();
    return this.http.post<Customer>(environment.apiUrl + '/customer', customer, this.httpOptions);
  }

  updateUserCustomer(customer: Customer, id: number): Observable<Customer>{
    this.setToken();
    return this.http.put<Customer>(environment.apiUrl + '/customer/' + id, customer, this.httpOptions);
  }

  updateUserPassword(id: number, passwordModel: any): Observable<User>{
    this.setToken();
    return this.http.put<User>(environment.apiUrl + '/user/password/' + id, passwordModel, this.httpOptions);
  }

  setToken(): void{
    //  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'bearer ' + this.authService.getToken());
  }

}
