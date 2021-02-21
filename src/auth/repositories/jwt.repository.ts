import { Injectable } from '@nestjs/common';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Jwt } from "../entities/jwt.entity";

@EntityRepository(Jwt)
@Injectable()
export class JwtRepository extends BaseRepository<Jwt> {
  async findById(jwtId: number) {
    return await this.createQueryBuilder('jwt')
      .where('jwt.id = :jwtId', { jwtId })
      .getOne();
  }
}

export const JwtRepositoryProvider = {
  provide: 'JwtRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(JwtRepository),
  inject: [Connection]
}