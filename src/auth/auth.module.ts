import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from '@ecommerce/components/member/member.module';
import { AuthService } from './auth.service';
import { Jwt } from './entities/jwt.entity';
import { AuthResolver } from './auth.resolver';
import { JwtRepository, JwtRepositoryProvider } from './repositories';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from '@ecommerce/core/config/jwt.config';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    TypeOrmModule.forFeature([Jwt]),
    forwardRef(() => MemberModule),
    JwtModule.registerAsync({
      imports: [ConfigService],
      useClass: JwtConfig,
    })
  ],
  providers: [AuthService, AuthResolver, JwtRepository, JwtStrategy, JwtRepositoryProvider],
  exports: [AuthService],
})
export class AuthModule {}
