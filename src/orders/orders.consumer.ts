import { Processor, Process } from '@nestjs/bull';
import { Job, DoneCallback } from 'bull';
import { OrdersService } from './orders.service';

@Processor('order')
export class OrderConsumer {
  constructor(private readonly ordersService: OrdersService) {}
  @Process('createOrder')
  async createOrder(job: Job<any>, done: DoneCallback) {
    const order = await this.ordersService.create(
      job.data.createOrderInput,
      job.data.user,
    );

    console.log('consumer', { order });

    done(null, 'It works');

    return order;
  }
}
