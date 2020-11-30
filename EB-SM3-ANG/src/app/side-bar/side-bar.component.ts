import {Component, HostListener, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shared/services/shopping-cart.service';
import {OrderItem} from '../shared/services/orderItem';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.ngOnDestroy();
  }

  shoppingCart: OrderItem[] = [];

  constructor(private shoppingService: ShoppingCartService) { }

  ngOnInit(): void {
    this.getShoppingCart();
  }

  ngOnDestroy(): void{
    this.shoppingService.saveCart();
  }


  getShoppingCart(): void{
    this.shoppingCart = this.shoppingService.getItems();
  }

  resetProducts(): void{
    this.shoppingCart = this.shoppingService.clearCart();
  }


  calculateTotal(): number{
    return this.shoppingCart.reduce((accumulator , OrderItem) => accumulator += OrderItem.quantity ,0);
  }

  calculateTotalPrice(): number{
    return this.shoppingCart.reduce((accumulator , OrderItem) => accumulator += OrderItem.item.price * OrderItem.quantity ,0);
  }

  modelChanged(orderItem: OrderItem) {
    if (orderItem.quantity === 0) {
      this.shoppingService.removeItem(orderItem.item);
      this.getShoppingCart();
    }
    this.shoppingService.saveCart();
  }






  getCartStatus(): boolean{
    return this.shoppingService.isClosed;
  }

  closeShoppingCart(): void{
    this.shoppingService.isClosed = true;
  }

}
