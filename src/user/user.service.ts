import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: UserDto) {
    try {
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

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002')
          throw new ForbiddenException('Credentials Taken');
      } else {
        throw error;
      }
    }
  }

  async update(id: number, dto: UserDto) {
    try {
      const userdb = await this.prisma.user.findUnique({ where: { id } });

      if (!userdb) throw new NotFoundException('User Not Found');

      const passwordHashed = await argon.hash(dto.password);

      const user = this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          phone: dto.phone,
          email: dto.email,
          password: passwordHashed,
          username: dto.username,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002')
          throw new ForbiddenException('Credentials Taken');
      } else {
        throw error;
      }
    }
  }

  async findById(id: number) {
    console.log('findById', id);

    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findWhere(where: any) {
    const list = await this.prisma.user.findMany({
      where: {},
    });

    if (!list.length) {
      throw new NotFoundException();
    }
    return list;
  }

  async deleteById(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new BadRequestException('User does not exists');
    }

    const deletedUser = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return deletedUser;
  }
}
