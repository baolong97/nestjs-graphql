import { Inject, Req, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthDto } from './dto/jwtAuth.dto';
import { SignInInput } from './dto/signIn.input';
import { SignUpInput } from './dto/signUp.input';
import { GraphqlAuthGuard } from './jwt-gql-auth.guard';
import { CurrentUser } from './user.decorator';

@Resolver(() => JwtAuthDto)
export class AuthResolver {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @Mutation(() => JwtAuthDto)
  async signUp(@Args('input') signUpInput: SignUpInput): Promise<JwtAuthDto> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => JwtAuthDto)
  async signIn(@Args('input') signInInput: SignInInput): Promise<JwtAuthDto> {
    return this.authService.validateUser(signInInput);
  }

  @Query(() => UserEntity)
  @UseGuards(GraphqlAuthGuard)
  async profile(@CurrentUser() user: any): Promise<UserEntity> {
    return user;
  }
}
