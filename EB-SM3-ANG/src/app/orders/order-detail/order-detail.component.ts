import { Component, OnInit } from '@angular/core';
import {Order} from '../shared/order';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {UserService} from '../../profile/shared/user.service';
import {User} from '../../profile/shared/user';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../shared/order.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: any = null;
  user: User;
  orderID: number = 0;

  loading: boolean = true;
  error: string = '';

  constructor(private authService: AuthenticationService, private userService: UserService,
              private orderService: OrderService, private router: Router,
              private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.orderID = +this.route.snapshot.paramMap.get('id');
    this.loadCustomer();
  }

  loadCustomer(): void{

    this.userService.getUserById(this.authService.getID()).subscribe((user) => {this.user = user}, (error) => {this.loading = false; this.router.navigate(['/login']); return;},
      () => {

      if(this.user.userRole !== 'Admin'){
        this.loadOrderUser();
      }
      else{
        this.loadOrderAdmin();
      }});
  }

  loadOrderUser(): void{
    this.orderService.readOrderByIDUser(this.orderID, this.user.id).subscribe((order) => {
      console.log(order);
      this.order = order; console.log(this.order); this.loading = false;}, () => {
      this.router.navigate(['/orders']);
    })}

  loadOrderAdmin(): void{
    this.orderService.readOrderByID(this.orderID).subscribe((order) => {
      console.log(order);
      this.order = order; this.loading = false;}, (error) => {
      this.error = error.error; this.loading = false;
    })}

  goBack(): void{
    this.location.back();
  }

}
