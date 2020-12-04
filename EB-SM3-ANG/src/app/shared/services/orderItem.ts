import {Beer} from "../../product/beers/shared/beer";

export interface OrderItem{
  item: Beer;
  quantity: number;
}
