import { Component, OnInit } from '@angular/core';
import {Order} from '../../shared/services/order';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {UserService} from '../../profile/shared/user.service';
import {User} from '../../profile/shared/user';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../order-list/shared/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: Order = null;
  user: User;
  orderID: number = 0;

  loading: boolean = true;
  error: string = '';

  constructor(private authService: AuthenticationService, private userService: UserService,
              private orderService: OrderService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderID = +this.route.snapshot.paramMap.get('id');
    this.loadCustomer();
  }

  loadCustomer(): void{

    this.userService.getUserById(this.authService.getID()).subscribe((user) => {this.user = user}, (error) => {this.loading = false; this.router.navigate(['/login']); return;},
      () => {

      debugger;
      console.log(this.user.userRole);
      if(this.user.userRole !== 'Admin'){
        this.loadOrderUser();
      }
      else{
        this.loadOrderAdmin();
      }});
  }

  loadOrderUser(): void{
    this.orderService.ReadOrderByIDUser(this.orderID, this.user.id).subscribe((order) => {
      this.order = order; this.loading = false;}, () => {
      this.router.navigate(['/orders']);
    })}

  loadOrderAdmin(): void{
    this.orderService.ReadOrderByID(this.orderID).subscribe((order) => {
      this.order = order; this.loading = false;}, (error) => {
      this.error = error.error; this.loading = false;
    })}

}
