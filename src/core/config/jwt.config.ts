import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}
  createJwtOptions() {
    return {
      secret: this.configService.get('secret'),
      signOptions: {
        expiresIn: this.configService.get('jwt').accessTokenTime,
      },
    };
  }
}
