import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BeerType} from "../../beertypes/shared/beertype";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Beer} from "./beer";

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };

  constructor(private http: HttpClient) { }

  addBeer(beer: Beer): Observable<Beer>{
    this.setToken();
    return this.http.post<Beer>(environment.apiUrl + '/beer', beer, this.httpOptions);
  }

  getBeers(filter: string): Observable<any>{
    return this.http.get<Observable<any>>(environment.apiUrl + '/beer' + filter);
  }

  getBeerById(id: number): Observable<Beer>{
    return this.http.get<Beer>(environment.apiUrl + '/beer/' + id);
  }

  updateType(beer: Beer): Observable<Beer>{
    this.setToken();
    return this.http.put<Beer>(environment.apiUrl + '/beer', beer, this.httpOptions);
  }

  deleteBeer(id: number): Observable<Beer>{
    this.setToken();
    return this.http.delete<Beer>(environment.apiUrl + '/beer/' + id, this.httpOptions);
  }

  setToken(): void{
    //  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'bearer ' + this.authService.getToken());
  }
}
