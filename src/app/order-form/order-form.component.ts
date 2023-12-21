import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
      const controls: { [key: string]: FormControl } = {
          customerName: new FormControl('', Validators.required),
          paidStatus: new FormControl(false)
      };

      this.cookies.forEach(cookie => {
          controls[cookie.type] = new FormControl(0, [Validators.required, Validators.min(0)]);
      });

      this.orderForm = this.formBuilder.group(controls, { validators: this.atLeastOneCookieSelected() });
      this.onChanges();
  }

  onChanges(): void {
    console.log("on changes reached");
    this.orderForm.valueChanges.subscribe(val => {
        this.runningTotal = this.calculateTotal();
    });
}

  calculateTotal(): number {
    if (!this.orderForm) {
      return 0;
    }

    const total = this.cookies.reduce((total, cookie) => {
        const quantity = this.orderForm.get(cookie.type)?.value;
        return total + (quantity * cookie.price);
    }, 0);

    console.log("Total calculated: ", total); // Debugging log
    return total;
  }

  private atLeastOneCookieSelected(): any {
    return (group: FormGroup): ValidationErrors | null => {
        const quantities = this.cookies.map(cookie => group.get(cookie.type)?.value || 0);
        const totalQuantity = quantities.reduce((sum, current) => sum + current, 0);
        return totalQuantity > 0 ? null : { noCookiesSelected: true };
    };
  }


  onSubmit() {
      if (this.orderForm.valid) {
          console.log('Order Data:', this.orderForm.value);
          // Handle order submission logic here
      }
  }
}