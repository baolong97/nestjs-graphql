import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { loggerMiddleware } from 'src/common/middleware/logger.field.middleware';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Directive('@upper')
  @Field({ nullable: true, middleware: [loggerMiddleware] })
  @Column()
  userName: string;

  // @Field({ nullable: true })
  @Exclude()
  @Column()
  password: string;

  @Field({ nullable: true })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
