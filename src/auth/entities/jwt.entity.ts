import { Entity, Column } from 'typeorm';
import { JwtType } from './jwt-type.enum';
import { DefaultEntity } from '@ecommerce/core/typeorm';

@Entity({
  name: 'jwt'
})
export class Jwt extends DefaultEntity {

  @Column({
    type: 'enum',
    enum: JwtType,
    default: JwtType.ACCESS
  })
  type: JwtType;

  @Column({
    name: 'expired_at',
    nullable: true
  })
  expiredAt: Date;
}