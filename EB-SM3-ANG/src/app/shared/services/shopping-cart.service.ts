import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  isClosed: boolean = true;

  constructor() { }

  collapse(): void{
    this.isClosed = !this.isClosed;
  }

}
