import {User} from './user';

export interface Customer{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetName: string;
  postalCode: number;
  cityName: string;
  user: User;
}
