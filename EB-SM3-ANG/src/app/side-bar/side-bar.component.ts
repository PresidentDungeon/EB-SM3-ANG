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

  constructor(public shoppingService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.shoppingService.saveCart();
  }

  modelChanged(orderItem: OrderItem) {
    if(orderItem.quantity > orderItem.item.stock){
      orderItem.quantity = orderItem.item.stock;
    }

    if (orderItem.quantity === 0) {
      this.shoppingService.removeItem(orderItem.item);
    }
  }

  getCartStatus(): boolean{
    return this.shoppingService.isClosed;
  }

  closeShoppingCart(): void{
    this.shoppingService.isClosed = true;
  }

}
