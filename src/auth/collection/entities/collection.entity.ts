import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Permission } from 'src/auth/permission/entities/permission.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Collection {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Field(() => [Permission])
  @OneToMany(() => Permission, (permission) => permission.collection)
  permissions: Permission[];
}
