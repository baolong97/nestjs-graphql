import { Inject, NotFoundException } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { assertWrappingType } from 'graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UserEntity } from './entities/user.entity';
import { PUB_SUB } from './users.constants';
import { UsersService } from './users.service';
const pubSub = new PubSub();

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    @Inject(PUB_SUB)
    private readonly pubSub: PubSub,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => UserEntity)
  async user(@Args('id') id: string): Promise<UserEntity> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => [UserEntity])
  async users(): Promise<UserEntity[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Mutation(() => UserEntity)
  async addUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    const user = await this.usersService.create(createUserInput);
    this.pubSub.publish('userAdded', { userAdded: user });
    return user;
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @Subscription(() => UserEntity, {
    name: 'userAdded',
  })
  userAdded() {
    // console.log('11111111111', pubSub.asyncIterator('userAdded'));
    return this.pubSub.asyncIterator('userAdded');
  }
}
