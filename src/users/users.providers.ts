import { PubSub } from 'apollo-server-express';
import { DEFAULT_CONNECTION } from 'src/database/database.constants';
import { Connection } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { PUB_SUB, USER_REPOSITORY } from './users.constants';
export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: [DEFAULT_CONNECTION],
  },
  {
    provide: PUB_SUB,
    useValue: new PubSub(),
  },
];
