import { Injectable } from '@nestjs/common';
import { Convert, Converter } from '@fabio.formosa/metamorphosis';
import { Member } from '../entities';

export class MeResponseDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
@Convert(Member, MeResponseDto)
export class MeConverter implements Converter<Member, MeResponseDto> {
  convert(source: Member): MeResponseDto {
    if(!source) return null;
    const target = new MeResponseDto();
    target.id = source.id;
    target.name = source.name;
    target.email = source.email;
    target.phoneNumber = source.phoneNumber;
    target.createdAt = source.createdAt;
    target.updatedAt = source.updatedAt;
    return target;
  }
}

