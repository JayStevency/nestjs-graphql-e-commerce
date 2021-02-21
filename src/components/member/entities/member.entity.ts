import { DefaultEntity } from "@ecommerce/core/typeorm";
import { Column, Entity } from "typeorm";

@Entity({
  name: 'member'
})
export class Member extends DefaultEntity {
  @Column()
  name: string;
  
  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;
}