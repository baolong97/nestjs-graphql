import { Order } from 'src/orders/entities/order.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { createConnection } from 'typeorm';
import { DEFAULT_CONNECTION } from './database.constants';

export const ENTITIES = [UserEntity, Order];

export const databaseProviders = [
  {
    provide: DEFAULT_CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: process.env.DATABASE_TYPE as any,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT as any,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: ENTITIES,
        synchronize: true,
      }),
  },
];
