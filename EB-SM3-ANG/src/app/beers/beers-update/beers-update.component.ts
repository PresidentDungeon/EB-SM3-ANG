import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BeerType} from "../../beertypes/shared/beertype";
import {Brand} from "../../brands/shared/brand";
import {BeerService} from "../shared/beer.service";
import {BeertypeService} from "../../beertypes/shared/beertype.service";
import {BrandService} from "../../brands/shared/brand.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Beer} from "../shared/beer";

@Component({
  selector: 'app-beers-update',
  templateUrl: './beers-update.component.html',
  styleUrls: ['./beers-update.component.css']
})
export class BeersUpdateComponent implements OnInit {

  beerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(32)]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99999)]),
    percentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    IBU: new FormControl('', [Validators.required, Validators.min(0), Validators.max(120)]),
    EBC: new FormControl('', [Validators.required, Validators.min(0), Validators.max(80)]),
    stock: new FormControl('', [Validators.min(0)]),
    type: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    imageURL: new FormControl(''),
  });

  beer: Beer = null;

  types: BeerType[];
  brands: Brand[];

  selectedImage: File = null;

  imageURL: string = '';
  invalidImageURL: string = 'https://firebasestorage.googleapis.com/v0/b/eb-sdm3.appspot.com/o/NoImage.png?alt=media&token=9f213b80-6356-4f8e-83b6-301936912a6e';
  loading: boolean = true;
  updateLoad: boolean = false;
  error: string = '';
  changed: boolean = false;
  found: boolean = true;


  constructor(private beerService: BeerService, private typeService: BeertypeService,
              private brandService: BrandService, private location: Location,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTypes();
    this.getBrands();
    this.getBeer();
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

  getBeer(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.beerService.getBeerById(id).subscribe(
      (beer) => {this.beer = beer; this.initialText();},
      (error) => { this.found = false;});
  }

  initialText(): void{
    if (this.beer != null){

      this.beerForm.patchValue({
        name: this.beer.name,
        description: this.beer.description,
        price: this.beer.price,
        percentage: this.beer.percentage,
        IBU: this.beer.ibu,
        EBC: this.beer.ebc,
        stock: this.beer.stock,
        type: this.beer.type.id,
        brand: this.beer.brand.id
      });

      this.imageURL = this.beer.imageURL;
      console.log(this.beer);

      this.loading = false;
    }
  }

  onFileChange(event){

    if(event.target.files.length === 0) {
      this.selectedImage = null;
    }
    else{
      this.selectedImage = <File>event.target.files[0];
    }

    this.changed = true;
  }

  deleteImage(){

    if(!this.beer.imageURL.includes('NoImage.png')){

      let imageTitle: string = this.beer.imageURL.substring(
      this.beer.imageURL.lastIndexOf("/o/") + 3,
      this.beer.imageURL.lastIndexOf("?alt")
      );

      let imageToDelete = {image: imageTitle}

      this.beerService.deleteImage(imageToDelete).subscribe((response) => {},
      (error) => {this.error = error.error;});
    }
  }

  updateBeer(): void{
    this.updateLoad = true;
    const beerData = this.beerForm.value;

    this.beer.name = beerData.name;
    this.beer.description = beerData.description;
    this.beer.price = beerData.price;
    this.beer.percentage = beerData.percentage;
    this.beer.ibu = beerData.IBU;
    this.beer.ebc = beerData.EBC;
    this.beer.stock = beerData.stock;
    this.beer.type = {id: beerData.type, typeName: ''}
    this.beer.brand = {id: beerData.brand, brandName: ''}

    if(this.changed){
      this.deleteImage();

      if(this.selectedImage){
        this.beerService.uploadImage(this.selectedImage).subscribe((response) => {
            let urls: string[] = response.message;
            this.imageURL = urls[0];},
          (error) => {this.error = error.error},
          () => {
          this.beer.imageURL = this.imageURL;


          this.beerService.updateBeer(this.beer).subscribe(() => {},
              error => {this.error = error.error; this.updateLoad = false;
                if(error.status === 401){this.router.navigate(['/login']);}},
              () => {this.router.navigate(['/beers']);});
        });
      }

      else{
        this.beer.imageURL = this.invalidImageURL;
        this.updateLoad = false;


        this.beerService.updateBeer(this.beer).subscribe(() => {},
          error => {this.error = error.error; this.updateLoad = false;
            if(error.status === 401){this.router.navigate(['/login']);}},
          () => {this.router.navigate(['/beers']);});
      }
    }
    else{

      this.beerService.updateBeer(this.beer).subscribe(() => {},
        error => {this.error = error.error; this.updateLoad = false;
          if(error.status === 401){this.router.navigate(['/login']);}},
        () => {this.router.navigate(['/beers']);});
    }
  }

  clearPreviousImage(){
    this.imageURL = this.invalidImageURL;
    this.changed = true;
  }

  goBack(): void{
    this.location.back();
  }


}
