import { Component, OnInit } from '@angular/core';
import {Beer} from "../beers/shared/beer";
import {Subject} from "rxjs";
import {BeerType} from "../beertypes/shared/beertype";
import {BeerService} from "../beers/shared/beer.service";
import {BeertypeService} from "../beertypes/shared/beertype.service";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {ShoppingCartService} from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  beers: Beer[];
  beerTypes: BeerType[];
  loading: boolean = true;

  totalItems: number;
  currentPage: number = 1;
  itemsPrPage: number = 10;
  smallNumPages: number = 0;

  searchTerms = new Subject<string>();
  searchTerm: string = "";

  BeerType: number = 0;
  sortingType: string = 'ADDED';
  sorting: string = 'asc';

  constructor(private beerService: BeerService, private typeService: BeertypeService, private shoppingService: ShoppingCartService) { }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((search) => {this.searchTerm = search; this.getBeers()});

    this.getTypes();
    this.getBeers();
  }

  getBeers(): void{
    const filter = `?CurrentPage=${this.currentPage}&ItemsPrPage=${this.itemsPrPage}&name=${this.searchTerm}&BeerTypeID=${this.BeerType}&SortingType=${this.sortingType}&Sorting=${this.sorting}`;
    this.loading = true;

    this.beerService.getBeers(filter).subscribe((FilterList) => {
      this.totalItems = FilterList.totalItems;
      this.beers = FilterList.list;
    }, error => {}, () => {this.loading = false; });
  }

  getTypes(): void{
    this.typeService.getTypes('').subscribe((FilterList) => {
      this.totalItems = FilterList.totalItems;
      this.beerTypes = FilterList.list;
    }, error => {}, () => {});
  }

  pageChanged($event: any): void {
    if ($event.page !== this.currentPage){
      this.currentPage = $event.page;
      this.getBeers();
    }
  }

  itemsPrPageUpdate(): void{
    this.smallNumPages = Math.ceil(this.totalItems / this.itemsPrPage);
    this.currentPage = 1;
    this.getBeers();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  addItem(beer: Beer): void{
    this.shoppingService.addToCart(beer);
  }

}
