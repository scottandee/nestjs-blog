import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Profile } from './profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.author, { cascade: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
