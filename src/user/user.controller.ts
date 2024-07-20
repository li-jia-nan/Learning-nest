import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post()
  addUser() {
    const user = { username: 'test' } as User;
    return this.userService.create(user);
  }
}
