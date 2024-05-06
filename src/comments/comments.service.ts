import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
