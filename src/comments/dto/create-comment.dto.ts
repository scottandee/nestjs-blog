import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  content: string;

  @IsNotEmpty()
  @IsNumber()
  post_id: number;
}
