import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { JwtRepository } from '../repositories/jwt.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private jwtRepository: JwtRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('secret')
    });
  }

  async validate(payload: any) {
    const foundJwt = await this.jwtRepository.findById(payload.jti);
    if(!foundJwt) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Not found jwt',
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    return {
      id: payload.sub,
      email: payload.email,
      type: foundJwt.type,
      jti: foundJwt.id
    }
  }
}