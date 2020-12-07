import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BeerType} from "./beertype";
import {AuthenticationService} from '../../../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BeertypeService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  addType(type: BeerType): Observable<BeerType>{
    return this.http.post<BeerType>(environment.apiUrl + '/beertype', type);
  }

  getTypes(filter: string): Observable<any>{
    return this.http.get<Observable<any>>(environment.apiUrl + '/beertype' + filter);
  }

  getTypeById(id: number): Observable<BeerType>{
    return this.http.get<BeerType>(environment.apiUrl + '/beertype/' + id);
  }

  updateType(type: BeerType): Observable<BeerType>{
    return this.http.put<BeerType>(environment.apiUrl + '/beertype/' + type.id, type);
  }

  deleteType(id: number): Observable<BeerType>{
    return this.http.delete<BeerType>(environment.apiUrl + '/beertype/' + id);
  }
}
