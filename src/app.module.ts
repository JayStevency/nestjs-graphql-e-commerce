import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import GraphQLJSON from 'graphql-type-json';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './core/config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './components/member/member.module';
import configuration from './core/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolvers: { JSON: GraphQLJSON },
      definitions: { path: join(process.cwd(), 'src/graphql.ts') },
      context: ({ req }) => ({
        headers: req.headers,
      }),
      uploads: {
        maxFileSize: 40000000,
        maxFiles: 6,
      },
      playground: true,
      debug: true
    }),
    AuthModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
