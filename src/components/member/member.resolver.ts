import { AccessAuthGuard } from '@ecommerce/auth/guard';
import { CurrentUser } from '@ecommerce/core/decorator/current-user';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignUpArgs } from './dto';
import { MemberService } from './member.service';

@Resolver('Member')
export class MemberResolver {
  constructor(private memberService: MemberService) {}

  @Mutation()
  async signUp(@Args() signUpArgs: SignUpArgs) {
    return this.memberService.signUp(signUpArgs)
  }

  @Query()
  @UseGuards(AccessAuthGuard)
  async me(@CurrentUser('user') member) {
    return this.memberService.me(member.id);
  }
}
