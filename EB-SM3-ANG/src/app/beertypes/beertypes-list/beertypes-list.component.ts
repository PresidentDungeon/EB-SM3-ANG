import { Component, OnInit } from '@angular/core';
import {BeerType} from "../shared/beertype";
import {BeertypeService} from "../shared/beertype.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-beertypes-list',
  templateUrl: './beertypes-list.component.html',
  styleUrls: ['./beertypes-list.component.css']
})
export class BeertypesListComponent implements OnInit {

  types: BeerType[];
  loading: boolean = true;

  totalItems: number;
  currentPage: number = 1;
  itemsPrPage: number = 10;
  smallnumPages: number = 0;

  constructor(private typeService: BeertypeService, private router: Router) {}

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes(): void{
    const filter = `?CurrentPage=${this.currentPage}&ItemsPrPage=${this.itemsPrPage}`;
    this.loading = true;

    this.typeService.getTypes(filter).subscribe((FilterList) => {
      this.totalItems = FilterList.totalItems;
      this.types = FilterList.list;
    }, error => {}, () => {this.loading = false; });
  }

  pageChanged($event: any): void {
    if ($event.page !== this.currentPage){
      this.currentPage = $event.page;
      this.getTypes();
    }
  }

  itemsPrPageUpdate(): void{
    this.smallnumPages = Math.ceil(this.totalItems / this.itemsPrPage);
    this.currentPage = 1;
    this.getTypes();
  }

  deleteType(id: number): void{
    this.typeService.deleteType(id).subscribe((brand) => this.getTypes(),
      error => {if (error.status === 401){this.router.navigate(['/login']); }});
  }

}
