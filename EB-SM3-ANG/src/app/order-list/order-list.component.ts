import { Component, OnInit } from '@angular/core';
import {OrderItem} from '../shared/services/orderItem';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: OrderItem[];
  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
