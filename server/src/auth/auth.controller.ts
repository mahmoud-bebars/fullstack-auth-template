import { UserPayload } from 'src/types/common.types';
import { Get, ValidationPipe } from '@nestjs/common';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
  Request,
  UsePipes,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';

import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK) // NestJS defaults to 201 Created; override it for login
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() request: LoginDto) {
    return this.authService.signin(request);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() request: RegisterDto) {
    return this.authService.signup(request);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  protectedRoute(@Request() request: { user: UserPayload }) {
    return {
      message: 'You are authorized',
      user: request.user,
    };
  }
}
