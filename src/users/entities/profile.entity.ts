import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // @Column()
  // photo: string

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  constructor(profile: Partial<Profile>) {
    Object.assign(this, profile);
  }
}
