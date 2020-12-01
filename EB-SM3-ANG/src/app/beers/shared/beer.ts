import {BeerType} from "../../beertypes/shared/beertype";
import {Brand} from "../../brands/shared/brand";

export interface Beer{
  id: number;
  name: string;
  description: string;
  price: number;
  percentage: number;
  ibu: number;
  ebc: number;
  stock: number;
  imageURL: string;
  type: BeerType;
  brand: Brand
}
