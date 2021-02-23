import { Injectable } from "@nestjs/common";
import { Connection, EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Product } from "../entities";

@EntityRepository(Product)
@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  
}

export const ProductRepositoryProvider = {
  provide: 'ProductRepository', 
  useFactory: (connection: Connection) => connection.getCustomRepository(ProductRepository),
  inject: [Connection]
}