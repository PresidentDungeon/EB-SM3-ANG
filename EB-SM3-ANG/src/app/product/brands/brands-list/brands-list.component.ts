import {Component, OnInit, TemplateRef} from '@angular/core';
import {Brand} from '../shared/brand';
import {BrandService} from '../shared/brand.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BeerType} from "../../beertypes/shared/beertype";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit {

  brands: Brand[];
  loading: boolean = true;

  totalItems: number;
  currentPage: number = 1;
  itemsPrPage: number = 10;
  smallNumPages: number = 0;

  modalRef: BsModalRef;
  selectedBrand: Brand;

  searchTerms = new Subject<string>();
  searchTerm: string = "";

  constructor(private brandService: BrandService, private router: Router,
              private modalService: BsModalService) {}

  ngOnInit(): void {

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((search) => {this.searchTerm = search; this.getBrands()});

    this.getBrands();
  }

  getBrands(): void{
    const filter = `?CurrentPage=${this.currentPage}&ItemsPrPage=${this.itemsPrPage}&name=${this.searchTerm}`;
    this.loading = true;

    this.brandService.getBrands(filter).subscribe((FilterList) => {
      this.totalItems = FilterList.totalItems;
      this.brands = FilterList.list;
    }, error => {}, () => {this.loading = false; });
  }

  pageChanged($event: any): void {
    if ($event.page !== this.currentPage){
      this.currentPage = $event.page;
      this.getBrands();
    }
  }

  itemsPrPageUpdate(): void{
    this.smallNumPages = Math.ceil(this.totalItems / this.itemsPrPage);
    this.currentPage = 1;
    this.getBrands();
  }

  deleteBrand(id: number): void{
    this.brandService.deleteBrand(id).subscribe((brand) => this.getBrands(),
      error => {if (error.status === 401){this.router.navigate(['/login']); }});
  }

  openDeleteModal(template: TemplateRef<any>, brandToDelete: Brand) {
    this.selectedBrand = brandToDelete;
    this.modalRef = this.modalService.show(template);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
