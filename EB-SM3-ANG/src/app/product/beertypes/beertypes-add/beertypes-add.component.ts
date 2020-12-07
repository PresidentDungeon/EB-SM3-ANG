import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {BeertypeService} from "../shared/beertype.service";
import {BeerType} from "../shared/beertype";

@Component({
  selector: 'app-beertypes-add',
  templateUrl: './beertypes-add.component.html',
  styleUrls: ['./beertypes-add.component.css']
})
export class BeertypesAddComponent implements OnInit {

  typeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(16)])
  });

  error: string = '';

  constructor(private typeService: BeertypeService, private location: Location,
              private router: Router) { }

  ngOnInit(): void {
  }

  createType(): void{
    const typeData = this.typeForm.value;
    const type: BeerType = {
      id: 0,
      typeName: typeData.name
    }

    this.typeService.addType(type).subscribe(() => {},
      (error) => {this.error = error.error;},
      () => {this.goBack()});
  }

  goBack(): void{
    this.location.back();
  }

}
