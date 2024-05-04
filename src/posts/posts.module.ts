import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/users.entity';
import { TagsService } from 'src/tags/tags.service';
import { Tag } from 'src/tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Tag])],
  controllers: [PostsController],
  providers: [PostsService, UsersService, TagsService],
})
export class PostsModule {}
