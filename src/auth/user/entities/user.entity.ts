import { Field, Int, ObjectType } from '@nestjs/graphql';
import bcrypt from 'bcrypt';
import { Profile } from 'src/auth/profile/entities/profile.entity';
import { Role } from 'src/auth/role/entities/role.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Field(() => Boolean)
  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @BeforeInsert()
  encryptPassword() {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }
}
