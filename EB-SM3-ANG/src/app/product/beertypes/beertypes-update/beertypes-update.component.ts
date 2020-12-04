import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Brand} from '../../brands/shared/brand';
import {BeerType} from '../shared/beertype';
import {BrandService} from '../../brands/shared/brand.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {BeertypeService} from '../shared/beertype.service';

@Component({
  selector: 'app-beertypes-update',
  templateUrl: './beertypes-update.component.html',
  styleUrls: ['./beertypes-update.component.css']
})
export class BeertypesUpdateComponent implements OnInit {

  typeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(16)])
  });

  type: BeerType = {id: 0, typeName: 'type'};
  loading: boolean = true;
  found: boolean = true;
  error: string = '';

  constructor(private typeService: BeertypeService, private location: Location,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getType();
  }

  initialText(): void{
    if (this.type != null){

      this.typeForm.patchValue({
        name: this.type.typeName
      });

      this.loading = false;
    }
  }

  getType(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.typeService.getTypeById(id).subscribe(
      (type) => {this.type = type; this.initialText();},
      (error) => { this.found = false;});
  }

  updateType(): void{
    const typeData = this.typeForm.value;

    this.type.typeName = typeData.name;

    this.typeService.updateType(this.type).subscribe(() => this.getType(),
      error => {this.error = error.error;
        if(error.status === 401){this.router.navigate(['/login']);}},
      () => {this.router.navigate(['/types']);});
  }

  goBack(): void{
    this.location.back();
  }

}
