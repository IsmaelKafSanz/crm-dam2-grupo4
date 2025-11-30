import { Component, OnInit } from '@angular/core';
import { Customer } from '../customers/customers.component';
import { CustomerDataService } from '../service/data/customer-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customer: Customer;
  id: number;

  constructor(private service: CustomerDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params.id);

    // Si es -1, significa que es un nuevo customer, así que usamos null como ID
    const customerId = this.id === -1 ? null : this.id;
    this.customer = new Customer(customerId, '', '', '', '', '', '', null);

    if (this.id !== -1) {
      this.service.retrieveCustomer('houarizegai', this.id).subscribe(
        response => this.customer = response
      );
    }
  }

  onSave() {
    console.log('=== SAVING CUSTOMER ===');
    console.log('Route ID:', this.id);
    console.log('Customer before save:', this.customer);

    if (this.id === -1) {
      console.log('>>> Creating NEW customer (POST)');

      // Crear un objeto sin el campo id
      const newCustomer = {
        name: this.customer.name,
        birthDate: this.customer.birthDate,
        email: this.customer.email
      };

      console.log('New customer object to send:', newCustomer);

      this.service.addCustomer('houarizegai', newCustomer as Customer).subscribe(
        response => {
          console.log('✅ Customer created successfully:', response);
          this.router.navigate(['customers']);
        },
        error => {
          console.error('❌ Error creating customer:', error);
          console.error('Error details:', error.error);
          console.error('Status:', error.status);
        }
      );
    } else {
      console.log('>>> Updating EXISTING customer (PUT)');
      this.service.updateCustomer('houarizegai', this.customer).subscribe(
        response => {
          console.log('✅ Customer updated successfully:', response);
          this.router.navigate(['customers']);
        },
        error => {
          console.error('❌ Error updating customer:', error);
        }
      );
    }
  }

}
