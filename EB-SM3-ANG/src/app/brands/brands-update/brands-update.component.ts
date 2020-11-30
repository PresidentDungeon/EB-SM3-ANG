import { Component, OnInit } from '@angular/core';
import {Brand} from "../shared/brand";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../shared/brand.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-brands-update',
  templateUrl: './brands-update.component.html',
  styleUrls: ['./brands-update.component.css']
})
export class BrandsUpdateComponent implements OnInit {

  brandForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(16)])
  });

  brand: Brand = {id: 0, brandName: 'brand'};
  loading: boolean = true;
  found: boolean = true;
  error: string = '';

  constructor(private brandService: BrandService, private location: Location,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBrand();
  }

  initialText(): void{
    if (this.brand != null){

      this.brandForm.patchValue({
        name: this.brand.brandName
      });

      this.loading = false;
    }
  }

  getBrand(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.brandService.getBrandById(id).subscribe(
      (brand) => {this.brand = brand; this.initialText();},
      (error) => { this.found = false;});
  }

  updateBrand(): void{
    const brandData = this.brandForm.value;

    this.brand.brandName = brandData.name;

    this.brandService.updateBrand(this.brand).subscribe(() => this.getBrand(),
      error => {this.error = error.error;
        if(error.status === 401){this.router.navigate(['/login']);}},
      () => {this.router.navigate(['/brands']);});
  }

  goBack(): void{
    this.location.back();
  }

}
