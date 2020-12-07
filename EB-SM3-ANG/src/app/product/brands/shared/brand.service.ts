import { Injectable } from '@angular/core';
import {Brand} from './brand';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  addBrand(brand: Brand): Observable<Brand>{
    return this.http.post<Brand>(environment.apiUrl + '/brand', brand);
  }

  getBrands(filter: string): Observable<any>{
    return this.http.get<Observable<any>>(environment.apiUrl + '/brand' + filter);
  }

  getBrandById(id: number): Observable<Brand>{
    return this.http.get<Brand>(environment.apiUrl + '/brand/' + id);
  }

  updateBrand(brand: Brand): Observable<Brand>{
    return this.http.put<Brand>(environment.apiUrl + '/brand/' + brand.id, brand);
  }

  deleteBrand(id: number): Observable<Brand>{
    return this.http.delete<Brand>(environment.apiUrl + '/brand/' + id);
  }
}
