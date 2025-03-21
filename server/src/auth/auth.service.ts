import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signin(credentials: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);
    }

    const payload = { name: user.name, email: user.email, sub: user.id };
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(credentials: { name: string; email: string; password: string }) {
    const existUser = await this.prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (existUser) {
      throw new HttpException('Email Already Exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(credentials.password, 14);

    const user = await this.prisma.user.create({
      data: {
        name: credentials.name,
        email: credentials.email,
        password: hashedPassword,
      },
    });

    return { id: user.id, name: user.name, email: user.email };
  }
}
