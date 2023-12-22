import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data-service';
import { Order } from '../core/models/order.module';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  Object: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.orders$.subscribe(orders => {
      this.orders = orders;
    });
  }

  getRowCount(order: Order): number {
    // Calculate the number of rows needed for this order
    return Math.max(Object.keys(order.cookies).length, 1);
  }

  isFirstItem(order: Order, item: any): boolean {
    // Check if the current item is the first in the order
    const keys = Object.keys(order.cookies);
    return keys.length > 0 && keys[0] === item.key;
  }

}
