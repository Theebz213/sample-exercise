import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersController } from './customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { CustomersService } from './customers/customers.service';
import { LoggingMiddleware } from './logging.middleware';

@Module({
  imports: [CustomersModule],
  controllers: [AppController, CustomersController],
  providers: [AppService, CustomersService],
})
export class AppModule implements NestModule {
configure(consumer: MiddlewareConsumer) {
  consumer.apply(LoggingMiddleware).forRoutes("/")
}
}
