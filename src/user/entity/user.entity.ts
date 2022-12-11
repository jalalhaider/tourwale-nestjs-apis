import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  name: string;
  image: string;
  phone: string;
  email: string;
  username: string;
  @Exclude()
  password: string;
  @Exclude()
  salt: string;
  gender: string;
  isActive: boolean;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
