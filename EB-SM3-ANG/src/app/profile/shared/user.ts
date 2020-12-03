import {Customer} from './customer';

export interface User{
  id: number;
  username: string;
  userrole: string;
  customer: Customer;
}
