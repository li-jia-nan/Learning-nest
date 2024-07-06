import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
// import { ConfigEnum } from './enum/config.enum';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getUsers() {
    // const url = this.configService.get(ConfigEnum.DB_URL);
    // console.log(url);
    const data = this.configService.get('dba');
    console.log(data);
    return this.userService.getUsers();
  }

  @Post()
  addUser() {
    return this.userService.addUser();
  }
}
