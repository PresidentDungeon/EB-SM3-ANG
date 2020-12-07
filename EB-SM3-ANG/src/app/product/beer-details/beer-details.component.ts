import { Component, OnInit } from '@angular/core';
import {BeerService} from '../beers/shared/beer.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Beer} from '../beers/shared/beer';
import {ShoppingCartService} from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {
  beer: Beer = null;

  loading: boolean = true;
  error: string = '';
  found: boolean = true;

  constructor(private beerService: BeerService, private location: Location,
              private router: Router, private route: ActivatedRoute,
              private shoppingService: ShoppingCartService) { }

  ngOnInit(): void {
  this.getBeer();
  }

  getBeer(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.beerService.getBeerById(id).subscribe(
      (beer) => {this.beer = beer;},
      (error) => { this.found = false;},
      () => {this.loading = false});
  }

  addItem(beer: Beer): void{
    this.shoppingService.addToCart(beer);
  }


}
