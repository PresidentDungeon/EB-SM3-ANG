import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shared/services/shopping-cart.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private shoppingSerivce: ShoppingCartService) { }

  ngOnInit(): void {
  }

  collapseCart(): void{
    this.shoppingSerivce.collapse();
  }
}
