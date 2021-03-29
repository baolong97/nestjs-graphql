import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { comparePassword, getHashPassword } from 'src/utils';
import { UsersService } from '../users/users.service';
import { JwtAuthDto } from './dto/jwtAuth.dto';
import { SignUpInput } from './dto/signUp.input';
import { JwtService } from '@nestjs/jwt';
import { SignInInput } from './dto/signIn.input';
@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<JwtAuthDto> {
    const { userName, password, confirmPassword } = signUpInput;

    if (password !== confirmPassword) {
      throw new Error('Password not match');
    }

    const user = await this.usersService.create({
      userName,
      password: await getHashPassword(password),
    });

    return {
      token: this.jwtService.sign({ id: user.id }),
      user: user,
    };
  }

  async validateUser(signInInput: SignInInput): Promise<any> {
    const { userName, password } = signInInput;
    const user = await this.usersService.findByUserName(userName);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new Error('Password is incorect');
    }

    return {
      token: this.jwtService.sign({ id: user.id }),
      user: user,
    };
  }

  async findById(id: string): Promise<any> {
    return await this.usersService.findOne(id);
  }
}
