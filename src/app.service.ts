import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.userRepository.count();
    if (count === 0) {
      const adminUser = this.userRepository.create({
        email: 'victhard05@gmail.com',
        firstName: 'Ivan',
        passwordHash: 'temporary_hash_2026',
        role: 'coach',
      });
      await this.userRepository.save(adminUser);
    } 
  }

  getHello(): string {
    return 'Hello World!';
  }
}