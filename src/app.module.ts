import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/users.entity';
import { IsUniqueConstraint } from './shared/validation/is-unique-constraint';
import * as dotenv from 'dotenv';
import { Profile } from './users/entities/profile.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { TagsModule } from './tags/tags.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { Tag } from './tags/entities/tag.entity';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: false,
      entities: [User, Profile, Post, Tag, Comment],
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    TagsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, IsUniqueConstraint],
})
export class AppModule {}
