import {Component, OnInit, TemplateRef} from '@angular/core';
import {BeerType} from "../shared/beertype";
import {BeertypeService} from "../shared/beertype.service";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

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
  smallNumPages: number = 0;

  modalRef: BsModalRef;
  selectedType: BeerType;

  searchTerms = new Subject<string>();
  searchTerm: string = "";

  constructor(private typeService: BeertypeService, private router: Router,
              private modalService: BsModalService) {}

  ngOnInit(): void {

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((search) => {this.searchTerm = search; this.getTypes()});

    this.getTypes();
  }

  getTypes(): void{
    const filter = `?CurrentPage=${this.currentPage}&ItemsPrPage=${this.itemsPrPage}&name=${this.searchTerm}`;
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
    this.smallNumPages = Math.ceil(this.totalItems / this.itemsPrPage);
    this.currentPage = 1;
    this.getTypes();
  }

  deleteType(id: number): void{
    this.typeService.deleteType(id).subscribe((brand) => this.getTypes(),
      error => {});
  }

  openDeleteModal(template: TemplateRef<any>, typeToDelete: BeerType) {
    this.selectedType = typeToDelete;
    this.modalRef = this.modalService.show(template);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
