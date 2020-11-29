import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../brands/shared/brand.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {BeerService} from "../shared/beer.service";
import {BeertypeService} from "../../beertypes/shared/beertype.service";
import {Brand} from "../../brands/shared/brand";
import {BeerType} from "../../beertypes/shared/beertype";
import {Beer} from "../shared/beer";

@Component({
  selector: 'app-beers-add',
  templateUrl: './beers-add.component.html',
  styleUrls: ['./beers-add.component.css']
})
export class BeersAddComponent implements OnInit {

  beerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(16)]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99999)]),
    percentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    IBU: new FormControl('', [Validators.required, Validators.min(0), Validators.max(120)]),
    EBC: new FormControl('', [Validators.required, Validators.min(0), Validators.max(80)]),
    type: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    imageURL: new FormControl('', [Validators.required]),

  });

  types: BeerType[];
  brands: Brand[];
  URL: string = '';
  invalidImageURL: string = 'https://firebasestorage.googleapis.com/v0/b/eb-sdm3.appspot.com/o/NoImage.png?alt=media&token=d522375a-08c4-4ea9-99b0-30f23e3d52ed';
  loading: boolean = true;
  imageLoad: boolean = false;
  error: string = '';

  constructor(private beerService: BeerService, private typeService: BeertypeService,
              private brandService: BrandService, private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    this.getTypes();
    this.getBrands();
  }

  getTypes(): void{
    const filter = `?sortingType=ALF&sorting=asc`;

    this.typeService.getTypes(filter).subscribe((FilterList) => {
      this.types = FilterList.list;
    }, error => {this.error = error.error}, () => {});
  }

  getBrands(): void{
    const filter = `?sortingType=ALF&sorting=asc`;

    this.brandService.getBrands(filter).subscribe((FilterList) => {
      this.brands = FilterList.list;
    }, error => {this.error = error.error}, () => {this.loading = false;});
  }

  onFileChange(event){
    this.imageLoad = true;

    let selectedFile: File = <File>event.target.files[0];

    this.beerService.uploadImage(selectedFile).subscribe((response) => {

      let urls: string[] = response.message;
      console.log(response);
      console.log(urls);
      this.URL = urls[0];},
      (error) => {this.error = error.error}, () => {this.imageLoad = false;});
  }

  createBeer(): void{

    this.loading = true;

    const beerData = this.beerForm.value;








    let imageURL: string = this.URL;
    if(imageURL === ''){
      imageURL = this.invalidImageURL;
    }

    const beer: Beer = {
      id: 0,
      name: beerData.name,
      description: beerData.description,
      price: beerData.price,
      percentage: beerData.percentage,
      IBU: beerData.IBU,
      EBC: beerData.EBC,
      type: {id: beerData.type, typeName: ''},
      brand: {id: beerData.brand, brandName: ''},
      imageURL: imageURL
    }

    this.beerService.addBeer(beer).subscribe(() => {},
      (error) => {this.error = error.error; this.loading = false;
        if(error.status === 401){this.router.navigate(['/login']);}},
      () => {this.goBack()});
  }

  goBack(): void{
    this.location.back();
  }

}
