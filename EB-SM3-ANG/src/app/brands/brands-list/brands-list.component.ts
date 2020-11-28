import { Component, OnInit } from '@angular/core';
import {Brand} from '../shared/brand';
import {BrandService} from '../shared/brand.service';
import {Router} from '@angular/router';

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
  smallnumPages: number = 0;

  constructor(private brandService: BrandService, private router: Router) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void{
    const filter = `?CurrentPage=${this.currentPage}&ItemsPrPage=${this.itemsPrPage}`;
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
    this.smallnumPages = Math.ceil(this.totalItems / this.itemsPrPage);
    this.currentPage = 1;
    this.getBrands();
  }

  deleteColor(id: number): void{
    this.brandService.deleteBrand(id).subscribe((brand) => this.getBrands(),
      error => {if (error.status === 401){this.router.navigate(['/login']); }});
  }

}
