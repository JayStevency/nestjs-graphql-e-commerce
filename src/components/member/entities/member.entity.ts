import { Product } from "@ecommerce/components/product/entities/product.entity";
import { DefaultEntity } from "@ecommerce/core/typeorm";
import { Column, Entity, OneToMany } from "typeorm";

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

  @OneToMany(type => Product, product => product.owner)
  products: Product[];
}