import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProfileModule } from './profile/profile.module';
import { PermissionModule } from './permission/permission.module';
import { CollectionModule } from './collection/collection.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User]),
    UserModule,
    RoleModule,
    ProfileModule,
    PermissionModule,
    CollectionModule,
  ],
})
export class AuthModule {}
