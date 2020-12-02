import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../brands/shared/brand.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
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

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.ngOnDestroy();
  }

  beerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(32)]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99999)]),
    percentage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    IBU: new FormControl('', [Validators.required, Validators.min(0), Validators.max(120)]),
    EBC: new FormControl('', [Validators.required, Validators.min(0), Validators.max(80)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    type: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    imageURL: new FormControl(''),
  });

  types: BeerType[];
  brands: Brand[];
  imageURL: string = '';
  invalidImageURL: string = 'https://firebasestorage.googleapis.com/v0/b/eb-sdm3.appspot.com/o/NoImage.png?alt=media&token=9f213b80-6356-4f8e-83b6-301936912a6e';
  loading: boolean = true;
  imageLoad: boolean = false;
  error: string = '';

  created: boolean = false;

  constructor(private beerService: BeerService, private typeService: BeertypeService,
              private brandService: BrandService, private location: Location,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.imageURL = (localStorage.getItem('loadedImage') !== null) ? JSON.parse(localStorage.getItem('loadedImage')).image : '';
    this.getTypes();
    this.getBrands();
  }

  ngOnDestroy(): void{
    if(!this.created && this.imageURL !== ''){localStorage.setItem('loadedImage', JSON.stringify({image: this.imageURL}))}
    else{localStorage.removeItem('loadedImage')}
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

    if(event.target.files.length === 0){
      if(this.imageURL !== ''){
        this.deleteImage();}}

    else{

      this.imageLoad = true;

      if(this.imageURL !== ''){
        this.deleteImage();
      }

      let selectedFile: File = <File>event.target.files[0];

      this.beerService.uploadImage(selectedFile).subscribe((response) => {

          let urls: string[] = response.message;
          this.imageURL = urls[0];},
        (error) => {this.error = error.error}, () => {this.imageLoad = false;});
    }
  }

  deleteImage(){
    this.imageLoad = true;

    let imageTitle: string = this.imageURL.substring(
      this.imageURL.lastIndexOf("/o/") + 3,
      this.imageURL.lastIndexOf("?alt")
    );

    let imageToDelete = {image: imageTitle}

    this.beerService.deleteImage(imageToDelete).subscribe((response) => {},
      (error) => {this.imageLoad = false; this.error = error.error;},
      () => {

        this.beerForm.patchValue({
          imageURL: ''
        });

      this.imageURL = '';
      this.imageLoad = false;
    });
  }

  createBeer(): void{

    this.loading = true;

    const beerData = this.beerForm.value;
    this.imageURL = (this.imageURL === '') ? this.invalidImageURL : this.imageURL;

    const beer: Beer = {
      id: 0,
      name: beerData.name,
      description: beerData.description,
      price: beerData.price,
      percentage: beerData.percentage,
      ibu: beerData.IBU,
      ebc: beerData.EBC,
      stock: beerData.stock,
      type: {id: beerData.type, typeName: ''},
      brand: {id: beerData.brand, brandName: ''},
      imageURL: this.imageURL
    }

    this.beerService.addBeer(beer).subscribe(() => {},
      (error) => {this.error = error.error; console.log(error); this.loading = false;
        if(error.status === 401){this.router.navigate(['/login']);}},
      () => {this.created = true; this.router.navigate(['/beers']);});
  }

  goBack(): void{
    this.location.back();
  }

}
