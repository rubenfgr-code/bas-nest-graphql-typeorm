import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { InjectConnection, TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Collection } from './auth/collection/entities/collection.entity';
import { Permission } from './auth/permission/entities/permission.entity';
import { Profile } from './auth/profile/entities/profile.entity';
import { Role } from './auth/role/entities/role.entity';
import { User } from './auth/user/entities/user.entity';
import configuration, { EnvironmentVariables } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        autoSchemaFile: join(
          process.cwd(),
          configService.get<string>('graphql.schemafile'),
        ),
        sortSchema: configService.get<boolean>('graphql.sort_schema'),
        buildSchemaOptions: {
          dateScalarMode: 'timestamp',
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get('db.user'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: [User, Role, Profile, Permission, Collection],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    @InjectConnection('default')
    private connectionDefault: Connection,
  ) {
    if (this.connectionDefault.isConnected) {
      console.log(`Database "${connectionDefault.name}" Online!`);
    }
  }
}
