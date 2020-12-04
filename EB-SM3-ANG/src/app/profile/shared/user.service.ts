import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Brand} from '../../product/brands/shared/brand';
import {Customer} from './customer';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };

  constructor(private http: HttpClient) { }

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
    return this.http.get<User>(environment.apiUrl + '/user/' + id);
  }


  setToken(): void{
    //  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'bearer ' + this.authService.getToken());
  }

}
