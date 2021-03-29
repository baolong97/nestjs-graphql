import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field({ description: 'Example field (placeholder)' })
  description: string;
}
