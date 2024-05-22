import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from '../../shared/validation/is-unique';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique({ tableName: 'tags', column: 'name' })
  name: string;
}
