import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers(): string {
    return 'This action returns all users';
  }
  addUser(): string {
    return 'This action adds a user';
  }
}
