import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import { Post } from '../../posts/entities/post.entity';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  posts: Post[];
}
