import { PubSub } from 'apollo-server-express';
import { DEFAULT_CONNECTION } from 'src/database/database.constants';
import { Connection } from 'typeorm';
import { Order } from './entities/order.entity';
import { ORDER_PUB_SUB, ORDER_REPOSITORY } from './orders.constants';
export const orderProviders = [
  {
    provide: ORDER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Order),
    inject: [DEFAULT_CONNECTION],
  },
  {
    provide: ORDER_PUB_SUB,
    useValue: new PubSub(),
  },
];
