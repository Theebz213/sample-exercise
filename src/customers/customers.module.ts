import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { customers } from './customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([customers])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule { }
