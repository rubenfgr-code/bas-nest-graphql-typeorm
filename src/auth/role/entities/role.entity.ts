import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Permission } from 'src/auth/permission/entities/permission.entity';
import { User } from 'src/auth/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Role {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @Field(() => [Permission])
  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];
}
