import { Member } from "@ecommerce/components/member/entities";
import { DefaultEntity } from "@ecommerce/core/typeorm";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ProductDetail } from "./product-detail.entity";

@Entity({
  name: 'product'
})
export class Product extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @OneToMany(type => ProductDetail, productDetail => productDetail.product)
  details: ProductDetail[];

  @ManyToOne(type => Member, member => member.products)
  owner: Member;
}