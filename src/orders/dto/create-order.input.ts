import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field({ description: 'Example field (placeholder)' })
  @IsEmail({}, { message: 'Vui long nhap email' })
  description: string;
}
