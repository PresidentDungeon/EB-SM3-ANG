import { Injectable } from '@angular/core';
import {Brand} from './brand';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };

  constructor(private http: HttpClient) { }

  addBrand(brand: Brand): Observable<Brand>{
    this.setToken();
    return this.http.post<Brand>(environment.apiUrl + '/brand', brand, this.httpOptions);
  }

  getBrands(filter: string): Observable<any>{
    return this.http.get<Observable<any>>(environment.apiUrl + '/brand' + filter);
  }

  getBrandById(id: number): Observable<Brand>{
    return this.http.get<Brand>(environment.apiUrl + '/brand/' + id);
  }

  updateBrand(brand: Brand): Observable<Brand>{
    this.setToken();
    return this.http.put<Brand>(environment.apiUrl + '/brand/' + brand.id, brand, this.httpOptions);
  }

  deleteBrand(id: number): Observable<Brand>{
    this.setToken();
    return this.http.delete<Brand>(environment.apiUrl + '/brand/' + id, this.httpOptions);
  }

  setToken(): void{
  //  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'bearer ' + this.authService.getToken());
  }
}
