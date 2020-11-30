import {Beer} from "../../beers/shared/beer";

export interface OrderItem{
  item: Beer;
  quantity: number;
}
