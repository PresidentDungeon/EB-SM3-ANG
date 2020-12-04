import {Customer} from '../../profile/shared/customer';
import {OrderItem} from './orderItem';

export interface Order
{
  id: number;
  accumulatedPrice: number;
  orderCreated: Date;
  customer: Customer
  orderBeers: OrderItem[]
}
