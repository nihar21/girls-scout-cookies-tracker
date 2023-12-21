import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  cookies = [
      { type: 'Thin Mints', price: 5 },
      { type: 'Samoas', price: 5 },
      // ... add other cookies here
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
      const controls: { [key: string]: FormControl } = {
          customerName: new FormControl('', Validators.required),
          paidStatus: new FormControl(false)
      };

      this.cookies.forEach(cookie => {
          controls[cookie.type] = new FormControl(0, [Validators.required, Validators.min(0)]);
      });

      this.orderForm = this.formBuilder.group(controls);
  }

  onSubmit() {
      if (this.orderForm.valid) {
          console.log('Order Data:', this.orderForm.value);
          // Handle order submission logic here
      }
  }
}