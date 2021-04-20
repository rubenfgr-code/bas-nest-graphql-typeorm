import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gender } from '../profile-gender.enum';

@ObjectType()
@Entity()
export class Profile {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.profile, { nullable: false })
  @JoinColumn()
  user: User;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  firstname: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Field(() => Gender)
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  birthdate: Date;
}
