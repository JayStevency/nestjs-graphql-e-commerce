import { AuthService } from '@ecommerce/auth/auth.service';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { MeConverter } from './converter';
import { SignUpArgs } from './dto';
import { MemberRepository } from './repositories';

@Injectable()
export class MemberService {
  constructor(
    private memberRepository: MemberRepository,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    private meConverter: MeConverter
  ) {}

  @Transactional()
  async signUp(signUpArgs: SignUpArgs) {
    try {
      const duplicatedMember = await this.memberRepository.findByEmail(signUpArgs.email);
      if(duplicatedMember) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: `Duplicate a email ${signUpArgs.email}`
          },
          HttpStatus.CONFLICT
        )
      }
      signUpArgs.password = await this.authService.generatePassword(signUpArgs.password);

      const newMember = await this.memberRepository.create(signUpArgs);
      await this.memberRepository.save(newMember);
      return {
        accessToken: await this.authService.getToken(newMember, 'ACCESS'),
        refreshToken: await this.authService.getToken(newMember, 'REFRESH', {
          expiresIn: '1d'
        })
      }
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async me(memberId: number) {
    return await this.meConverter.convert(await this.memberRepository.findById(memberId));
  }
}
