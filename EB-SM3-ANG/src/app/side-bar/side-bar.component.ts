import {Component, HostListener, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.ngOnDestroy();
  }

  constructor(private shoppingService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.shoppingService.saveCart();
  }

  getCartStatus(): boolean{
    return this.shoppingService.isClosed;
  }

  closeShoppingCart(): void{
    this.shoppingService.isClosed = true;
  }

}
