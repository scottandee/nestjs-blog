import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserDto } from './dto/sign-up.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto) {
    // Hash Password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    signUpUserDto.password = await bcrypt.hash(signUpUserDto.password, salt);

    // Call the user sevice sign in method
    const user = await this.usersService.createUser(signUpUserDto);
    return user;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne(signInDto.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const owner = await bcrypt.compare(signInDto.password, user.password);
    if (!owner) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
