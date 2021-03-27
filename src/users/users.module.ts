import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...userProviders, UsersResolver],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
