import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../shared/services/shopping-cart.service';
import {BeerService} from '../../product/beers/shared/beer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public shoppingService: ShoppingCartService, private beerService: BeerService,
              private router: Router) { }

  ngOnInit(): void {
  }

  collapseCart(): void{
    this.shoppingService.collapse();
  }

  calculateItemCount(): string{
    let total: number = this.shoppingService.calculateTotal();
    return (total <= 99)?total + "": "+99";
  }

  searchRedirect(event: KeyboardEvent): void{
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };


    let searchString: string = (event.target as HTMLInputElement).value.trim();
    this.router.navigate(['/shop/', searchString]);

  }

}
