import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Order } from '../core/models/order.module';
import {v4 as uuid} from 'uuid';
import { DataService } from '../core/data-service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup = new FormGroup({});
  cookies = [
      { type: 'Thin Mints', price: 6 },
      { type: 'Samoas', price: 6 },
      { type: 'Tagalongs', price: 6 },
      { type: 'Adventurefuls', price: 6 },
      { type: 'Do-si-dos', price: 6 },
      { type: 'Trefoils', price: 6 },
      { type: 'Lemon-Ups', price: 6 },
      { type: 'Girl Scout S\'mores', price: 6 },
      { type: 'Toffee-tastic (Gluten-Free)', price: 6 },
      
  ];
  quantities: number[] = Array.from({ length: 101 }, (_, i) => i);
  runningTotal = 0;
  currentOrder: Order = this.resetOrder();

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {}

  ngOnInit() {
      const controls: { [key: string]: FormControl } = {
          customerName: new FormControl('', Validators.required),
          paidStatus: new FormControl(false)
      };

      this.cookies.forEach(cookie => {
          controls[cookie.type] = new FormControl(0, [Validators.required, Validators.min(0)]);
      });

      this.orderForm = this.formBuilder.group(controls, { validators: this.atLeastOneCookieSelected() });
      
      this.orderForm.valueChanges.subscribe(values => {
        console.log("Form values: ", values)
        console.log("Form Status: ", this.orderForm.valid)
        this.runningTotal = this.calculateTotal();

        this.currentOrder = {
            ...this.currentOrder,
            name: values.customerName,
            cookies: this.getSelectedCookies(values),
            totalAmount: this.runningTotal,
            isPaid: values.paidStatus
        };
      });

  }

  // onChanges(): void {
  //   console.log("Form state: ", this.orderForm.valid)

  //   this.orderForm.valueChanges.subscribe(val => {
  //       this.runningTotal = this.calculateTotal();
  //   });

  //   this.orderForm.valueChanges.subscribe(values => {
  //     this.currentOrder = {
  //         ...this.currentOrder,
  //         name: values.customerName,
  //         cookies: this.getSelectedCookies(values),
  //         totalAmount: this.calculateTotal(),
  //         isPaid: values.paidStatus
  //     };
  //   });
  // }

  calculateTotal(): number {
    if (!this.orderForm) {
      return 0;
    }

    const total = this.cookies.reduce((total, cookie) => {
        const quantity = this.orderForm.get(cookie.type)?.value;
        return total + (quantity * cookie.price);
    }, 0);

    return total;
  }

  getSelectedCookies(values: any): { [type: string]: number } {
    return this.cookies.reduce((selected: { [type: string]: number }, cookie) => {
        const quantity = values[cookie.type];
        if (quantity > 0) {
            selected[cookie.type] = quantity;
        }
        return selected;
    }, {});
}

  private atLeastOneCookieSelected(): any {
    return (group: FormGroup): ValidationErrors | null => {
        const quantities = this.cookies.map(cookie => group.get(cookie.type)?.value || 0);
        const totalQuantity = quantities.reduce((sum, current) => sum + current, 0);
        return totalQuantity > 0 ? null : { noCookiesSelected: true };
    };
  }

  resetOrder(): Order {
    // Returns a new Order object with default values
    return {
        orderId: uuid(), // Generate or set orderId as needed
        name: '',
        cookies: {},
        totalAmount: 0,
        isPaid: false
    };
  }


  onSubmit() {
    console.log("Form state: ", this.orderForm.valid)
      if (this.orderForm.valid) {
          console.log('Current Order:', this.currentOrder);
          this.dataService.addOrder(this.currentOrder)
            .then(() => {
              this.resetFormAndOrder();
            })
            .catch(error => {
                // Handle any errors
                console.error("Error submitting order: ", error);
            });
      }
      console.log("Form state: ", this.orderForm.valid)
      console.log("Form object: ", this.orderForm)
  }

  resetFormAndOrder() {
    const resetValues = {
      customerName: '',
      paidStatus: false,
      ...this.cookies.reduce((acc: { [type: string]: number }, cookie) => {
          acc[cookie.type] = 0; // Set each cookie's quantity to 0
          return acc;
      }, {})
    };
    this.orderForm.reset(resetValues);
    this.orderForm.markAsPristine();
    this.orderForm.markAsUntouched();
    this.currentOrder = this.resetOrder();
  }
}