import { Injectable } from "@nestjs/common";
import { Connection, EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { ProductDetail } from "../entities";

@EntityRepository(ProductDetail)
@Injectable()
export class ProductDetailRepository extends BaseRepository<ProductDetail> {

}

export const ProductDetailRepositoryProvider = {
  provide: 'ProductDetailRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(ProductDetailRepository),
  inject: [Connection]
}