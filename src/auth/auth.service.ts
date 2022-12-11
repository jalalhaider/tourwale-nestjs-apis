import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signIn() {}

  async signUp(dto: AuthDto) {
    const passwordHashed = await argon.hash(dto.password);

    const user = this.prisma.user.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        password: passwordHashed,
        username: dto.username,
      },
    });

    return user;
  }
}
