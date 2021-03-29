import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/udpate-user.input';
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

  async findByUserName(userName: string): Promise<UserEntity> {
    return this.userRepository.findOne({ userName });
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(data);
  }

  async update(id: string, data: UpdateUserInput): Promise<UserEntity> {
    let user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    user = { ...user, ...data };
    await this.userRepository.save(user);

    return await this.findOne(id);
  }

  async remove(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }
}
