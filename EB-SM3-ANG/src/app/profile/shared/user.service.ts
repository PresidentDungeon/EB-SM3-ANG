import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Brand} from '../../product/brands/shared/brand';
import {Customer} from './customer';
import {User} from './user';
import {Order} from '../../orders/shared/order';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  purchaseCart(order: Order): Observable<Order>{
    return this.http.post<Order>(environment.apiUrl + '/order/', order);
  }

  register(username: string, password: string): Observable<boolean>{
    return this.http.post<any>(environment.apiUrl + '/user', {username, password})
      .pipe(map(response => {
        if (response.id !== 0) {return true;}
        else {return false;}
      }));
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(environment.apiUrl + '/user/' + id);
  }

  getCustomerById(id: number): Observable<Customer>{
    return this.http.get<Customer>(environment.apiUrl + '/customer/' + id);
  }

  createUserCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(environment.apiUrl + '/customer', customer);
  }

  updateUserCustomer(customer: Customer, id: number): Observable<Customer>{
    return this.http.put<Customer>(environment.apiUrl + '/customer/' + id, customer);
  }

  updateUserPassword(id: number, passwordModel: any): Observable<User>{
    return this.http.put<User>(environment.apiUrl + '/user/password/' + id, passwordModel);
  }
}
