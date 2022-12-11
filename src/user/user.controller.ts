import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }
  @Get()
  getList(@Body() where: UserDto) {
    return this.userService.findWhere(where);
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
