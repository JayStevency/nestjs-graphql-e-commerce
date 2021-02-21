import { Injectable } from '@nestjs/common';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Member } from '../entities/member.entity';
import { IMember } from '../interface/member';


@EntityRepository(Member)
@Injectable()
export class MemberRepository extends BaseRepository<Member>  {
  async findById(memberId: number) {
    return await this.createQueryBuilder('member')
      .where('member.id = :memberId', { memberId })
      .getOne();
  }

  async findByEmail(email: string) {
    return await this.createQueryBuilder('member')
      .where('member.email = :email', { email })
      .getOne();
  }
}

export const MemberRepositoryProvider = {
  provide: 'MemberRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(MemberRepository),
  inject: [Connection]
}