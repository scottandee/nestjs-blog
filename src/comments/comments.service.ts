import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { EntityManager, Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(user: User, createCommentDto: CreateCommentDto) {
    const comment = new Comment({ content: createCommentDto.content });
    const post = await this.entityManager.getRepository(Post).findOne({
      where: { id: createCommentDto.post_id },
      relations: { comments: true },
    });
    user.comments.push(comment);
    post.comments.push(comment);
    await this.entityManager.save(post);
    await this.entityManager.save(user);
    return comment;
  }

  findAll(page: number) {
    return this.commentsRepository
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.user', 'user')
      .leftJoinAndSelect('comments.post', 'post')
      .select([
        'comments.id',
        'comments.content',
        'post.title',
        'post.content',
        'user.id',
        'user.username',
      ])
      .skip((page - 1) * 10)
      .take(10)
      .getMany();
  }

  findOne(id: number) {
    return this.commentsRepository
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.user', 'user')
      .leftJoinAndSelect('comments.post', 'post')
      .where('comments.id = :id', { id })
      .select([
        'comments.id',
        'comments.content',
        'post.id',
        'post.title',
        'post.content',
        'user.id',
        'user.username',
      ])
      .getOne();
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentsRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException();
    }
    comment.content = updateCommentDto.content;
    return await this.entityManager.save(comment);
  }

  async remove(id: number) {
    const result = await this.commentsRepository.delete({ id });
    if (result.affected > 0) {
      return {};
    } else {
      throw new NotFoundException();
    }
  }

  async isOwner(userId: number, commentId: string) {
    const comment = await this.commentsRepository.findOne({
      where: { id: +commentId },
      relations: { user: true },
    });
    if (!comment) {
      throw new NotFoundException();
    }
    if (comment.user.id === userId) {
      return true;
    }
    return false;
  }
}
