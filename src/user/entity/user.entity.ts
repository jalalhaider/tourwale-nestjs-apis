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
  salt: string;
  gender: string;
  isActive: boolean;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
