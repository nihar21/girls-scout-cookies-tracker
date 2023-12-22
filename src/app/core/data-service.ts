// core/services/api.service.ts
import { Injectable } from '@angular/core';
import { getDatabase, onValue, ref, set } from "firebase/database";
import { Order } from './models/order.module';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private ordersSource = new BehaviorSubject<Order[]>([]);

  constructor() {
    this.getOrders();
  }

  db = getDatabase();
  
  addOrder(order: Order): Promise<void> {
    const orderRef = ref(this.db, 'orders/' + order.orderId);
    return set(orderRef, order);
  }

  getOrders() {
    const ordersRef = ref(this.db, 'orders');

    onValue(ordersRef, snapshot => {
        const orders: any[] = [];
        snapshot.forEach(childSnapshot => {
          orders.push({ ...childSnapshot.val(), orderId: childSnapshot.key });
        });
        this.ordersSource.next(orders);
    });
  }

  orders$ = this.ordersSource.asObservable();
  
}