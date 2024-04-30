import { IsEmail, IsString, Length, MaxLength, MinLength } from "class-validator";
import { IsNull } from "typeorm";

export class LoginUserDto {
    @IsString()
    @Length(5, 10)
    username: string;

    @IsEmail()
    email: string;

    @Length(6, 12)
    @IsString()
    password: string;
  }