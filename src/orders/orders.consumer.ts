import { Processor, Process, OnQueueCompleted } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job, DoneCallback } from 'bull';
import { OrdersService } from './orders.service';

@Processor('order')
export class OrderConsumer {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly logger: Logger,
  ) {}
  @Process('createOrder')
  async createOrder(job: Job<any>, done: DoneCallback) {
    const order = await this.ordersService.create(
      job.data.createOrderInput,
      job.data.user,
    );

    done(null, order);
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    this.logger.log(job.returnvalue);
  }
}
