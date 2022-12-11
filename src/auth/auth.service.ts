import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    const passwordHashed = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        password: passwordHashed,
        username: dto.username,
      },
    });

    return this.signToken(user.id, user.email);
  }

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email is wrong');
    }

    const argonVerify = await argon.verify(user.password, password);

    if (!argonVerify) {
      throw new ForbiddenException('Password is wrong');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email: email,
    };

    const secret = this.config.get('JWT_SECRET');
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { accessToken };
  }
}
