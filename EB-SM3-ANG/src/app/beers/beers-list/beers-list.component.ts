import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import {Beer} from "../shared/beer";
import {BeerService} from "../shared/beer.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BeerType} from "../../beertypes/shared/beertype";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Subject} from "rxjs";
import {BeertypeService} from "../../beertypes/shared/beertype.service";

@Component({
  selector: 'app-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.css']
})
export class BeersListComponent implements OnInit {

  beers: Beer[];
  beerTypes: BeerType[];
  loading: boolean = true;

  totalItems: number;
  currentPage: number = 1;
  itemsPrPage: number = 10;
  smallNumPages: number = 0;

  modalRef: BsModalRef;
  selectedBeer: Beer;

  searchTerms = new Subject<string>();
  searchTerm: string = "";

  BeerType: number = 0;

  constructor(private beerService: BeerService, private typeService: BeertypeService,
              private router: Router, private modalService: BsModalService) {}

  ngOnInit(): void {

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((search) => {this.searchTerm = search; this.getBeers()});

    this.getTypes();
    this.getBeers();
  }

  getBeers(): void{
    const filter = `?CurrentPage=${this.currentPage}&ItemsPrPage=${this.itemsPrPage}&name=${this.searchTerm}&BeerTypeID=${this.BeerType}`;
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

  deleteBeer(id: number): void{
    this.beerService.deleteBeer(id).subscribe((brand) => this.getBeers(),
      error => {if (error.status === 401){this.router.navigate(['/login']); }});
  }

  openDeleteModal(template: TemplateRef<any>, beerToDelete: Beer) {
    this.selectedBeer = beerToDelete;
    this.modalRef = this.modalService.show(template);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
