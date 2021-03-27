import { createConnection } from 'typeorm';
import { DEFAULT_CONNECTION, ENTITIES } from './database.constants';

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
