import { AccessAuthGuard } from '@ecommerce/auth/guard';
import { CurrentUser } from '@ecommerce/core/decorator/current-user';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductArgs } from './dto';
import { ProductService } from './product.service';

@Resolver("Product")
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Mutation()
  @UseGuards(AccessAuthGuard)
  async createProduct(
    @CurrentUser('user') member,
    @Args() createProductArgs: CreateProductArgs
  ) {
    return this.productService.createProduct(member.id, createProductArgs); 
  }
}
