import {Component, HostListener, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shared/services/shopping-cart.service';
import {OrderItem} from '../shared/services/orderItem';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../profile/shared/user.service';
import {Customer} from '../profile/shared/customer';
import {Order} from '../shared/services/order';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.ngOnDestroy();
  }

  orderCreateLoad: boolean = false;
  error: string = '';

  constructor(public shoppingService: ShoppingCartService, private authService: AuthenticationService,
              private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.shoppingService.saveCart();
  }

  modelChanged(orderItem: OrderItem) {
    if(orderItem.quantity > orderItem.item.stock){
      orderItem.quantity = orderItem.item.stock;
    }

    if (orderItem.quantity === 0) {
      this.shoppingService.removeItem(orderItem.item);
    }
  }

  orderProducts(): void{

    debugger;
    this.orderCreateLoad = true;

    let date = new Date();
    date.setTime(date.getTime() + 2*60*60*1000);

    let listItems: any[] = [];
    this.shoppingService.getItems().forEach((orderItem) => {
      listItems.push({beerID: orderItem.item.id, amount: orderItem.quantity})
    })



    const userID = this.authService.getID();
    if(userID === null){this.router.navigate(['/login']); this.orderCreateLoad = false; return;}

    this.userService.getCustomerById(userID).subscribe((customer) => {
      if(customer === null){this.router.navigate(['/profile']); return;}

      const order: Order = {
        id: 0,
        accumulatedPrice: this.shoppingService.calculateTotalPrice(),
        customer: customer,
        orderBeers: listItems,
        orderCreated: new Date(date)
      }

      this.userService.purchaseCart(order).subscribe((order) => {
        this.orderCreateLoad = false;
        this.shoppingService.clearCart();
        this.closeShoppingCart();
        //this.router.navigate(['/order/' + order.id]);
        },
        (error) => {
        if (error.status === 400){
          //recalculate items in case of stock change
          this.shoppingService.loadCart();
        }
        if (error.status === 401){this.router.navigate(['/login']);}
          this.orderCreateLoad = false;
          this.error = error.error;
      })
    }, (error) => {this.orderCreateLoad = false; this.router.navigate(['/profile']);})
  }


  getCartStatus(): boolean{
    return this.shoppingService.isClosed;
  }

  closeShoppingCart(): void{
    this.shoppingService.isClosed = true;
  }

}
