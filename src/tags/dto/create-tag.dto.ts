import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from 'src/shared/validation/is-unique';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique({ tableName: 'tags', column: 'name' })
  name: string;
}
