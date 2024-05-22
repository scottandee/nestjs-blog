import { Comment } from '../../comments/entities/comment.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { User } from '../../users/entities/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable()
  tags: Tag[];

  constructor(post: Partial<Post>) {
    Object.assign(this, post);
  }
}
