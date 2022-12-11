import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SettingModule } from './setting/setting.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [AuthModule, UserModule, SettingModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
