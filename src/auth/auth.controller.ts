import { Controller, Inject } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtAuthDto } from './dto/jwtAuth.dto';
import { SignUpInput } from './dto/signUp.input';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}
}
