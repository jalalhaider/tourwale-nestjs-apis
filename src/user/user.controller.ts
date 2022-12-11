import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guard';
import { UserDto } from './dto';
import { UserEntity } from './entity';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);

    return new UserEntity(user);
  }
  @Get()
  async getList(@Body() where: UserDto) {
    const list = await this.userService.findWhere(where);

    return list.map((user) => new UserEntity(user));
  }

  @Post()
  create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() user: UserDto) {
    return this.userService.update(id, user);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }
}
