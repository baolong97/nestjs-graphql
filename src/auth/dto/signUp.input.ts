import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field({ nullable: false })
  userName: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  confirmPassword: string;
}
