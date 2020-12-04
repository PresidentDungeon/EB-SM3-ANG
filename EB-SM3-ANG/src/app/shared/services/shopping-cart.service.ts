import { Injectable } from '@angular/core';
import {OrderItem} from "./orderItem";
import {Beer} from "../../product/beers/shared/beer";
import {BeerService} from '../../product/beers/shared/beer.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart: OrderItem[] = [];
  isClosed: boolean = true;
  isChanged: boolean = false;

  constructor(private beerService: BeerService) {this.loadCart();}

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
  }

  removeItem(item: Beer) {
    this.shoppingCart = this.shoppingCart.filter(x => x.item.id != item.id);
  }

  getItems(): OrderItem[] {
    return this.shoppingCart;
  }

  clearCart() {
    this.shoppingCart = [];
  }

  calculateTotal(): number{
    return this.shoppingCart.reduce((accumulator , OrderItem) => accumulator += OrderItem.quantity ,0);
  }

  calculateTotalPrice(): number{
    return this.shoppingCart.reduce((accumulator , OrderItem) => accumulator += OrderItem.item.price * OrderItem.quantity ,0);
  }

  isValid(beer: Beer): boolean{
    var orderItemInCart = this.shoppingCart.find(x => x.item.id == beer.id);
    if(orderItemInCart){return orderItemInCart.quantity >= beer.stock}
  }

  saveCart(): void{
    localStorage.setItem('shoppingCart', JSON.stringify({ shoppingCart: this.shoppingCart}));
  }

  loadCart(): boolean{

    //When loading a check is ongoing checking for item stock

    if(localStorage.getItem('shoppingCart') !== null){

      var cart = JSON.parse(localStorage.getItem('shoppingCart')).shoppingCart;
      cart.forEach((item: OrderItem, index, object) => {

        this.beerService.getBeerById(item.item.id).subscribe((beer)=>{

          item.item = beer;

          if(item.quantity > beer.stock){

            if(item.quantity === 0){object.splice(index, 1);}
            else{
              item.quantity = beer.stock;
            }
            this.isChanged = true;
            this.isClosed = false;
          }
        }, (error) => {if(error.status === 404){object.splice(index, 1); this.isChanged = true; this.isClosed = false;}});
      })

      this.shoppingCart = cart;
      return this.isChanged;
    }
  }

}
