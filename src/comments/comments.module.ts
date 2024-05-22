import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User])],
  controllers: [CommentsController],
  providers: [CommentsService, UsersService],
})
export class CommentsModule {}
