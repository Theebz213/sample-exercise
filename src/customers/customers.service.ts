import { HttpException, Injectable } from '@nestjs/common';
import { CUSTOMERS } from './customers.mock';

@Injectable()
export class CustomersService {

  customers = CUSTOMERS;

  getCustomers(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.customers);
    });
  }

  getCustomer(customerId): Promise<any> {
    let id = customerId;
    return new Promise(resolve => {
      const customer = this.customers.find(customer => customer.id === id);
      if (!customer) {
        throw new HttpException('Customer does not exist', 404)
      }
      resolve(customer);
    })
  }

  addCustomer(customer): Promise<any> {
    return new Promise(resolve => {
      this.customers.push(customer);
      resolve(this.customers);
    });
  }

  deleteCustomer(customerId): Promise<any> {
    let id = Number(customerId);
    return new Promise(resolve => {
      let index = this.customers.findIndex(customer => customer.id === id);
      if (index === -1) {
        throw new HttpException('Customer does not exist', 404);

      }
      this.customers.splice(index, 1);
      resolve(this.customers);

    });

  }
  
}
