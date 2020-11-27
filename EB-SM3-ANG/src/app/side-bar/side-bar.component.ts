import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private shoppingService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  getCartStatus(): boolean{
    return this.shoppingService.isClosed;
  }

  closeShoppingCart(): void{
    this.shoppingService.isClosed = true;
  }

}
