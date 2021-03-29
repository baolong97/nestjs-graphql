import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';

@ObjectType()
export class JwtAuthDto {
  @Field({ nullable: false })
  token: string;

  @Field((type) => UserEntity, { nullable: false })
  user: UserEntity;
}
