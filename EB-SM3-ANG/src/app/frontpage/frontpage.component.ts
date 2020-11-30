import { Component, OnInit } from '@angular/core';
import {Beer} from '../beers/shared/beer';
import {BeerService} from '../beers/shared/beer.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  beers: Beer[];
  loading: boolean = false;

  constructor(private beerService: BeerService) { }

  ngOnInit(): void {
    this.getBeers();
  }

  getBeers(): void{
    const filter = `?CurrentPage=1&ItemsPrPage=4`;
    this.loading = true;

    this.beerService.getBeers(filter).subscribe((FilterList) => {
      this.beers = FilterList.list;
    }, error => {}, () => {this.loading = false; });
  }

}
