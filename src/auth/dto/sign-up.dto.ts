import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUnique } from '../../shared/validation/is-unique';
import { Gender } from '../../users/entities/profile.entity';

export class SignUpUserDto {
  @IsString()
  @Length(5, 10)
  @IsUnique({ tableName: 'users', column: 'username' })
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsUnique({ tableName: 'users', column: 'email' })
  @IsNotEmpty()
  email: string;

  @Length(6, 12)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  gender: Gender;
}
