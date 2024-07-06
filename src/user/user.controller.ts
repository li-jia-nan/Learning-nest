import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from './enum/config.enum';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getUsers() {
    this.configService.get(ConfigEnum.DB);
    return this.userService.getUsers();
  }

  @Post()
  addUser() {
    return this.userService.addUser();
  }
}
