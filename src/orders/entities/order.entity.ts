import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('orders')
export class Order {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => UserEntity, { nullable: false })
  @ManyToOne(() => UserEntity, (entity) => entity.orders)
  user: UserEntity;

  @Field((type) => String, { nullable: true })
  @Column()
  description?: string;
}
