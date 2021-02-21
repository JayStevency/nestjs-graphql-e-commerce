import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginArgs } from './dto';
import { RefreshAuthGuard, AccessAuthGuard } from './guard';
import { CurrentUser } from '@ecommerce/core/decorator/current-user';
import { MemberRepository } from '@ecommerce/components/member/repositories';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private memberRepository: MemberRepository,
  ) {}

  @Mutation()
  async login(@Args() loginArgs: LoginArgs) {
    try {
      
      const foundMember = await this.memberRepository.findByEmail(loginArgs.email);
      if (!foundMember) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            errorCode: 'ERR102',
            error: `Not found a member by ${loginArgs.email}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const loginMember = await this.authService.validateMember(
        loginArgs.email,
        loginArgs.password,
      );
      if (!loginMember) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            errorCode: 'ERR001',
            error: 'No matched email or password',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      const resultToken = {
        accessToken: await this.authService.getToken(foundMember, 'ACCESS'),
        refreshToken: await this.authService.getToken(foundMember, 'REFRESH', {
          expiresIn: '1d',
        }),
      };
      return resultToken;
    } catch (error) {
      throw error;
    }
  }

  @Mutation()
  @UseGuards(RefreshAuthGuard)
  async getAccessToken(@CurrentUser('user') member) {
    return {
      accessToken : await this.authService.getToken(member, 'ACCESS'),
      refreshToken : await this.authService.getToken(member, 'REFRESH', {
        expiresIn: '1d'
      })
    }
  }

  @Mutation()
  @UseGuards(AccessAuthGuard)
  async revokeAccessToken(@CurrentUser('user') member) {
    return await this.authService.revokeToken(member.jti);
  }

  @Mutation()
  @UseGuards(RefreshAuthGuard)
  async revokeRefreshToken(@CurrentUser('user') member) {
    return await this.authService.revokeToken(member.jti);
  }
}
