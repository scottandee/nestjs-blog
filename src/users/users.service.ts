import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async findOne(username: string) {
    const result = await this.usersRepository.findOne({
      where: {
        username,
      },
      relations: { posts: true, profile: true },
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const profile = new Profile({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        gender: createUserDto.gender,
      });
      const user = new User({
        username: createUserDto.username,
        password: createUserDto.password,
        email: createUserDto.email,
        profile,
        posts: [],
      });
      return await this.entityManager.save(user);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
