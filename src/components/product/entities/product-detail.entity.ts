import { DefaultEntity } from "@ecommerce/core/typeorm";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./product.entity";

@Entity({
  name: 'product_detail'
})
export class ProductDetail extends DefaultEntity {
  @Column()
  title: string;

  @Column({
    type: 'text'
  })
  contents: string;

  @Column()
  ordering: number;

  @ManyToOne(type => Product, product => product.details)
  @JoinColumn({
    name: 'product_id'
  })
  product: Product
}