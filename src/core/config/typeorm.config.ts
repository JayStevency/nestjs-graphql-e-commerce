import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {  
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions() {
    const database = this.configService.get('database');
    return {
      type: 'postgres' as 'postgres',
      host: database.host,
      port: database.port,
      username: database.user,
      password: database.password,
      database: database.db,
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      migrations : ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: database.synchronous,
      namingStrategy: new SnakeNamingStrategy(),
      cli: {
        migrationsDir: 'src/migrations',
        entitiesDir: 'src/**/**/*.entities{.ts,.js}'
      },
    }
  }
}