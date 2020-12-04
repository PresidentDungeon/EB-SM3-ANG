import { Component, OnInit } from '@angular/core';
import {OrderItem} from '../../shared/services/orderItem';
import {OrderService} from './shared/order.service';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Order} from '../../shared/services/order';
import {Router} from '@angular/router';
import {Customer} from '../../profile/shared/customer';
import {UserService} from '../../profile/shared/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  customer: Customer;
  customerID: number = 0;

  loading: boolean = true;
  error: string = '';

  totalItems: number;
  currentPage: number = 1;
  itemsPrPage: number = 10;
  smallNumPages: number = 0;

  constructor(private orderService: OrderService, private authService: AuthenticationService,
              private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer(): void{

    this.customerID = this.authService.getID()
    this.userService.getCustomerById(this.customerID).subscribe((customer) => {this.customer = customer}, (error) => {this.loading = false; return;},
      () => {
        if (this.customer === null){this.loading = false; }
        else{
          this.loadOrders();
        }});
  }

  loadOrders(): void{
    const filter = `?CurrentPage=${this.currentPage}&ItemsPrPage=${this.itemsPrPage}`;

    this.orderService.getOrdersFromCustomer(this.customerID, filter).subscribe((FilterList) => {
      this.totalItems = FilterList.totalItems;
      this.orders = FilterList.list;
      this.loading = false;},
      (error) => {if (error.status === 401){this.router.navigate(['/login']);}
          this.error = error.error; this.loading = false; this.loading = false;})
  }

  pageChanged($event: any): void {
    if ($event.page !== this.currentPage){
      this.currentPage = $event.page;
      this.loadOrders();
    }
  }

  itemsPrPageUpdate(): void{
    this.smallNumPages = Math.ceil(this.totalItems / this.itemsPrPage);
    this.currentPage = 1;
    this.loadOrders();
  }

}
