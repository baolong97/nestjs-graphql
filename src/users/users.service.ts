import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { USER_REPOSITORY } from './users.constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(data);
  }

  async remove(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }
}
