import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BeerType} from "./beertype";

@Injectable({
  providedIn: 'root'
})
export class BeertypeService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };

  constructor(private http: HttpClient) { }

  addType(type: BeerType): Observable<BeerType>{
    this.setToken();
    return this.http.post<BeerType>(environment.apiUrl + '/beertype', type, this.httpOptions);
  }

  getTypes(filter: string): Observable<any>{
    return this.http.get<Observable<any>>(environment.apiUrl + '/beertype' + filter);
  }

  getTypeById(id: number): Observable<BeerType>{
    return this.http.get<BeerType>(environment.apiUrl + '/beertype/' + id);
  }

  updateType(type: BeerType): Observable<BeerType>{
    this.setToken();
    return this.http.put<BeerType>(environment.apiUrl + '/beertype/' + type.id, type, this.httpOptions);
  }

  deleteType(id: number): Observable<BeerType>{
    this.setToken();
    return this.http.delete<BeerType>(environment.apiUrl + '/beertype/' + id, this.httpOptions);
  }

  setToken(): void{
    //  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'bearer ' + this.authService.getToken());
  }
}
