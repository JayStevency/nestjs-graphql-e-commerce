import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import GraphQLJSON from 'graphql-type-json';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './core/config/typeorm.config';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
