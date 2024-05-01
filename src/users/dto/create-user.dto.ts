import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto extends CreateProfileDto {
  username: string;
  email: string;
  password: string;
}
