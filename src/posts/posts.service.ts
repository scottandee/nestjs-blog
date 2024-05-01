import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/users/entities/users.entity';
import { Post } from './entities/post.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(user: User, createPostDto: CreatePostDto) {
    const post = new Post(createPostDto);
    console.log(user);
    user.posts.push(post);
    await this.entityManager.save(user);
    return post;
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
