import { Injectable } from '@angular/core';
import {OrderItem} from "./orderItem";
import {Beer} from "../../beers/shared/beer";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart: OrderItem[] = [];
  isClosed: boolean = true;

  constructor() {this.loadCart();}

  collapse(): void{
    this.isClosed = !this.isClosed;
  }

  addToCart(beer: Beer) {

    var orderItemInCart = this.shoppingCart.find(x => x.item.id == beer.id);

    if(!orderItemInCart){

      this.shoppingCart.push(Object.assign({},{item: beer, quantity: 1}));

    }

    else{
      orderItemInCart.quantity++;
    }

    //this.isClosed = false;
  }

  removeItem(item: Beer) {
    this.shoppingCart = this.shoppingCart.filter(x => x.item.id != item.id);
  }

  getItems(): OrderItem[] {
    return this.shoppingCart;
  }

  clearCart() {
    this.shoppingCart = [];
    //localStorage.removeItem('shoppingCart');
    return this.shoppingCart;
  }

  saveCart(): void{
    localStorage.setItem('shoppingCart', JSON.stringify({ shoppingCart: this.shoppingCart}));
  }

  loadCart(): void{
    if(localStorage.getItem('shoppingCart') !== null){
      this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')).shoppingCart;
    }
  }

}
