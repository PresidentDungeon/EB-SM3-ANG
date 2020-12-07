import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../shared/brand.service";
import {Brand} from "../shared/brand";
import {Router} from "@angular/router";

@Component({
  selector: 'app-brands-add',
  templateUrl: './brands-add.component.html',
  styleUrls: ['./brands-add.component.css']
})
export class BrandsAddComponent implements OnInit {

  brandForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(16)])
  });

  error: string = '';

  constructor(private brandService: BrandService, private location: Location,
              private router: Router) { }

  ngOnInit(): void {
  }

  createBrand(): void{
    const brandData = this.brandForm.value;
    const brand: Brand = {
      id: 0,
      brandName: brandData.name
    }

    this.brandService.addBrand(brand).subscribe(() => {},
      (error) => {this.error = error.error;},
      () => {this.goBack()});
  }

  goBack(): void{
    this.location.back();
  }

}
