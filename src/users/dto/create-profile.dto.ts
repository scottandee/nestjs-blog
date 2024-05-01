import { Gender } from '../entities/profile.entity';

export class CreateProfileDto {
  firstName: string;
  lastName: string;
  gender: Gender;
}
