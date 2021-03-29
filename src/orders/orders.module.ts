import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrderConsumer } from './orders.consumer';
import { orderProviders } from './orders.providers';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'order',
    }),
  ],
  providers: [OrdersResolver, OrdersService, OrderConsumer, ...orderProviders],
})
export class OrdersModule {}
