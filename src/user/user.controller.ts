import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post()
  addUser() {
    const user = { username: 'test-sss', password: '8798' } as User;
    return this.userService.create(user);
  }

  @Get('/profile')
  getUserProfile() {
    return this.userService.findProfile(2);
  }

  @Get('/logs')
  getUserLogs() {
    return this.userService.findUserLogs(2);
  }

  @Get('/logsByGroup')
  async getLogsByGroup() {
    const res = await this.userService.findLogsByGroup(2);
    return res;
  }
}
