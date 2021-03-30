import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GraphqlAuthGuard } from 'src/auth/jwt-gql-auth.guard';
import { CurrentUser } from 'src/auth/user.decorator';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/udpate-user.input';
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

  @UseGuards(RolesGuard)
  @UseGuards(GraphqlAuthGuard)
  @Roles(Role.User)
  @Query(() => [UserEntity])
  async users(@CurrentUser() user): Promise<UserEntity[]> {
    console.log({ user });
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

  @Mutation(() => UserEntity)
  async editUser(
    @Args('id') id: string,
    @Args('input') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    console.log(id, updateUserInput);
    const user = await this.usersService.update(id, updateUserInput);
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
