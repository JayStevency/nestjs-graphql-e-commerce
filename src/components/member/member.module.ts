import { forwardRef, Module } from '@nestjs/common';
import { MemberRepository, MemberRepositoryProvider } from './repositories';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities';
import { AuthModule } from '@ecommerce/auth/auth.module';
import { MeConverter } from './converter';
@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    forwardRef(() => AuthModule)
  ],
  providers: [
    MemberRepository,
    MemberRepositoryProvider,
    MemberResolver,
    MemberService,
    MeConverter,
  ],
  exports: [
    MemberRepository,
    MemberRepositoryProvider
  ]
})
export class MemberModule {}
