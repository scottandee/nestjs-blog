import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/users.entity';
import { Post } from './entities/post.entity';
import { EntityManager, EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(user: User, createPostDto: CreatePostDto) {
    const post = new Post({
      title: createPostDto.title,
      content: createPostDto.content,
    });
    user.posts.push(post);
    await this.entityManager.save(user);

    for (const tag of createPostDto.tags) {
      const result = await this.entityManager.getRepository(Tag).findOne({
        where: { name: tag.name },
        relations: { posts: true },
      });
      result.posts.push(post);
      await this.entityManager.save(result);
    }
    return post;
  }

  findAll(page: number) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    return this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('post.tags', 'tags')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'author.id',
        'author.username',
        'comments.id',
        'comments.content',
        'tags.id',
        'tags.name',
      ])
      .skip(skip)
      .take(pageSize)
      .getMany();
  }

  async findOne(id: number) {
    try {
      const result = await this.postsRepository
        .createQueryBuilder('post')
        .where('post.id = :id', { id })
        .leftJoinAndSelect('post.author', 'author')
        .leftJoinAndSelect('post.comments', 'comments')
        .leftJoinAndSelect('post.tags', 'tags')
        .select([
          'post.id',
          'post.title',
          'post.content',
          'author.id',
          'author.username',
          'comments.id',
          'comments.content',
          'tags.id',
          'tags.name',
        ])
        .getOneOrFail();
      return result;
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException();
    }
    post.title = updatePostDto.title;
    post.content = updatePostDto.content;
    return await this.entityManager.save(post);
  }

  async remove(id: number) {
    const result = await this.postsRepository.delete({ id });
    if (result.affected > 0) {
      return {};
    } else {
      throw new NotFoundException();
    }
  }

  async isOwner(userId: number, postId: string) {
    const post = await this.postsRepository.findOne({
      where: { id: +postId },
      relations: { author: true },
    });
    if (!post) {
      throw new NotFoundException();
    }
    if (post.author.id === userId) {
      return true;
    }
    return false;
  }
}
