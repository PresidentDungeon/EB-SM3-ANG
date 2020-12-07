import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Beer} from './beer';
import {environment} from '../../../../environments/environment';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {Order} from '../../../orders/shared/order';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  searchString: string = '';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  addBeer(beer: Beer): Observable<Beer>{
    return this.http.post<Beer>(environment.apiUrl + '/beer', beer);
  }

  getBeers(filter: string): Observable<any>{
    return this.http.get<Observable<any>>(environment.apiUrl + '/beer' + filter);
  }

  getBeerById(id: number): Observable<Beer>{
    return this.http.get<Beer>(environment.apiUrl + '/beer/' + id);
  }

  updateBeer(beer: Beer): Observable<Beer>{
    return this.http.put<Beer>(environment.apiUrl + '/beer/' + beer.id, beer);
  }

  deleteBeer(id: number): Observable<Beer>{
    return this.http.delete<Beer>(environment.apiUrl + '/beer/' + id);
  }

  uploadImage(file: File): Observable<any>{

    const fd = new FormData();
    fd.append('image', file, file.name);

    return this.http.post<any>('https://us-central1-eb-sdm3.cloudfunctions.net/uploadFile', fd);
  }

  deleteImage(imageToDelete: any): Observable<any>{
    return this.http.post<any>('https://us-central1-eb-sdm3.cloudfunctions.net/deleteFile', imageToDelete);
  }
}
