import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  isOpen: boolean = false;

  constructor() { }

  collapse(): void{
    this.isOpen = !this.isOpen;
  }

}
