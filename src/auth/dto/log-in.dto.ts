import { IsEmail, IsString, Length, MaxLength, MinLength } from "class-validator";
import { IsUnique } from "src/shared/validation/is-unique";
import { IsNull } from "typeorm";

export class LoginUserDto {
    @IsString()
    @Length(5, 10)
    @IsUnique({ tableName: 'users', column: 'username' })
    username: string;

    @IsEmail()
    @IsUnique({ tableName: 'users', column: 'email'})
    email: string;

    @Length(6, 12)
    @IsString()
    password: string;
  }