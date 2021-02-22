import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpArgs } from './dto';
import { MemberService } from './member.service';

@Resolver('Member')
export class MemberResolver {
  constructor(private memberService: MemberService) {}

  @Mutation()
  async signUp(@Args() signUpArgs: SignUpArgs) {
    return this.memberService.signUp(signUpArgs)
  }
}
