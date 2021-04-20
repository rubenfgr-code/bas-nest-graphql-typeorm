import { Field, ObjectType } from '@nestjs/graphql';
import { Collection } from 'src/auth/collection/entities/collection.entity';
import { Role } from 'src/auth/role/entities/role.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Permission {
  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.permissions, { primary: true })
  role: Role;

  @Field(() => Collection)
  @ManyToOne(() => Collection, (collection) => collection.permissions, {
    primary: true,
  })
  collection: Collection;

  @Field(() => Boolean)
  @Column({ type: 'bool', default: false })
  create: boolean;

  @Field(() => Boolean)
  @Column({ type: 'bool', default: false })
  read: boolean;

  @Field(() => Boolean)
  @Column({ type: 'bool', default: false })
  update: boolean;

  @Field(() => Boolean)
  @Column({ type: 'bool', default: false })
  delete: boolean;
}
