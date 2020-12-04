import {Customer} from './customer';

export interface User{
  id: number;
  username: string;
  userRole: string;
  customer: Customer;
}
