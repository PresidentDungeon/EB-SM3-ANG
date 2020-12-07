import {Component, OnInit, TemplateRef} from '@angular/core';
import {Order} from '../shared/order';
import {OrderService} from '../shared/order.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];

  loading: boolean = true;
  error: string = '';

  totalItems: number;
  currentPage: number = 1;
  itemsPrPage: number = 10;
  smallNumPages: number = 0;

  modalRef: BsModalRef;
  selectedOrder: Order;
  orderFinished: boolean = false;

  constructor(private orderService: OrderService, private router: Router,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void{
    const filter = `?CurrentPage=${this.currentPage}&ItemsPrPage=${this.itemsPrPage}&OrderFinished=${this.orderFinished}`;
    this.loading = true;

    this.orderService.getAllOrders(filter).subscribe((FilterList) => {
        this.totalItems = FilterList.totalItems;
        this.orders = FilterList.list;},
      (error) => {
        this.error = error.error; this.loading = false;},
      () => {this.loading = false;})
  }

  updateOrder(id: number): void{
    this.orderService.updateOrderStatus(id).subscribe((order) => {this.loadOrders()},
      error => {console.log(error);});
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

  openUpdateModal(template: TemplateRef<any>, orderToUpdate: Order) {
    this.selectedOrder = orderToUpdate;
    this.modalRef = this.modalService.show(template);
  }

}
