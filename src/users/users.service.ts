import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager
  ) {}

  findOne(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async createUser(createUserDto: CreateUserDto): Promise<any>{
    const user = new User(createUserDto);

    return await this.entityManager.save(user);
  }
}
