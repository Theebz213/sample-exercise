import { HttpException, Injectable } from '@nestjs/common';
import { CUSTOMERS } from './customers.mock';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customers } from './customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(customers)
    private customersRepository: Repository<customers>,
  ) { }
  findall(): Promise<customers[]> {
    return this.customersRepository.find();
  }
  findOne(id: number): Promise<customers>{
    return this.customersRepository.findOneBy({ id });
  }
  async remove(id: number){
    await this.customersRepository.delete(id);
  }
  cstmr = CUSTOMERS;

  getCustomers(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.cstmr);
    });
  }

  getCustomer(customerId): Promise<any> {
    let id = customerId;
    return new Promise(resolve => {
      const customer = this.cstmr.find(customer => customer.id === id);
      if (!customer) {
        throw new HttpException('Customer does not exist', 404)
      }
      resolve(customer);
    })
  }

  addCustomer(customer): Promise<any> {
    return new Promise(resolve => {
      this.cstmr.push(customer);
      resolve(this.cstmr);
    });
  }

  deleteCustomer(customerId): Promise<any> {
    let id = Number(customerId);
    return new Promise(resolve => {
      let index = this.cstmr.findIndex(customer => customer.id === id);
      if (index === -1) {
        throw new HttpException('Customer does not exist', 404);

      }
      this.cstmr.splice(index, 1);
      resolve(this.cstmr);

    });

  }

}
