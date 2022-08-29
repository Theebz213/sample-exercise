import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersController } from './customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { CustomersService } from './customers/customers.service';
import { LoggingMiddleware } from './logging.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customers } from './customers/customers.entity'; 

@Module({
  imports: [CustomersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("/")
  }
}
