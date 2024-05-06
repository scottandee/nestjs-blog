import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateTagDto } from 'src/tags/dto/create-tag.dto';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 256)
  content: string;

  tags: CreateTagDto[];
}
