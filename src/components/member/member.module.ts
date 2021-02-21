import { Module } from '@nestjs/common';
import { MemberRepository, MemberRepositoryProvider } from './repositories';
@Module({
  providers: [
    MemberRepository,
    MemberRepositoryProvider
  ],
  exports: [
    MemberRepository,
    MemberRepositoryProvider
  ]
})
export class MemberModule {}
