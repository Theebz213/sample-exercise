import { Controller, Get, Param, Post, Delete, Body, Query, PipeTransform, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './create-customer.dto';
import { CUSTOMERS } from './customers.mock';
import { LoggingInterceptor } from 'src/logging.interceptor';

@Controller('customers')
@UseInterceptors(LoggingInterceptor)
export class CustomersController {
  constructor(private customersService: CustomersService) { }

  @Get()
  async getCustomers() {
    const customers = await this.customersService.getCustomers();
    return customers;
  }

  @Get(':customerId')
  async getCustomer(@Param('customerId') customerId) {
    const customer = await this.customersService.getCustomer(customerId);
    return customer;
  }

  @Post()
  async addCustomer(@Body(new ValidationPipe()) createCustomerDto: CreateCustomerDto) {
    const customer = await this.customersService.addCustomer(createCustomerDto);
    
    
    return customer;
  }
  @Delete()
  async deleteCustomer(@Query() query) {
    const customers = await this.customersService.deleteCustomer(query.customerId);
    return customers;
  }
}
