import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { loggerMiddleware } from 'src/common/middleware/logger.field.middleware';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Directive('@upper')
  @Field({ nullable: true, middleware: [loggerMiddleware] })
  @Column({ unique: true })
  userName: string;

  // @Field({ nullable: true })
  @Exclude()
  @Column()
  password: string;

  @Field({ nullable: true })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Order, (entity) => entity.user)
  orders: Order[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
