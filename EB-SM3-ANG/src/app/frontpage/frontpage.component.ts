import { Component, OnInit } from '@angular/core';
import {Beer} from '../beers/shared/beer';
import {BeerService} from '../beers/shared/beer.service';
import {ShoppingCartService} from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  beers: Beer[];
  loading: boolean = false;

  constructor(private beerService: BeerService, private shoppingService: ShoppingCartService) { }

  ngOnInit(): void {
    this.getBeers();
  }

  getBeers(): void{
    const filter = `?CurrentPage=1&ItemsPrPage=4&SortingType=ADDED&Sorting=asc`;
    this.loading = true;

    this.beerService.getBeers(filter).subscribe((FilterList) => {
      this.beers = FilterList.list;
    }, error => {}, () => {this.loading = false; });
  }

  addItem(beer: Beer): void{
    this.shoppingService.addToCart(beer);
  }

}
