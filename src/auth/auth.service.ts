import Bcrypt from 'bcrypt'
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { JwtRepository } from './repositories/jwt.repository';
import { MemberRepository } from '@ecommerce/components/member/repositories';
import { Jwt, JwtType } from './entities';


@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => MemberRepository))
    private readonly memberRepository: MemberRepository,
    private readonly jwtRepository: JwtRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateMember(email: string, password: string): Promise<any> {
    const member = await this.memberRepository.findByEmail(email);
    if (member && (await this.verifyPassword(member.password, password))) {
      const { password, ...result } = member;
      return result;
    }
  }

  async verifyPassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    return await Bcrypt.compare(password, hashedPassword);
  }

  async generatePassword(password: string) {
    return await Bcrypt.hash(password, 10);
  }

  async getToken(user:any, type: string, jwtOpt?): Promise<any> {
    const entityJwt = await this.jwtRepository.create();
    entityJwt.type =  JwtType[type];
    await this.jwtRepository.save(entityJwt);
    const token = jwtOpt
    ? this.jwtService.sign({
        email: user.email,
        roles: user.roles,
        sub: user.id,
        jti: entityJwt.id,
      },
      jwtOpt,
    )
    : this.jwtService.sign({
      email: user.email,
      roles: user.roles,
      sub: user.id,
      jti: entityJwt.id
    });
    const expiredAt = jwt.decode(token)['exp'];
    await this.jwtRepository.update(entityJwt.id, {
      expiredAt: new Date(expiredAt * 1000),
    });
    return token;
  }

  async revokeToken(jwtId: string) {
    try {
      const deletedToken = await this.jwtRepository.delete(jwtId);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
