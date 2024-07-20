import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  findAll() {
    return this.userRepository.find();
  }
  find(username: string) {
    return this.userRepository.findOne({ where: { username: username } });
  }
  create(user: User) {
    const userTmp = this.userRepository.create(user);
    return this.userRepository.save(userTmp);
  }
  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
