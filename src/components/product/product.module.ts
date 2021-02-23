import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductDetail } from './entities';
import { MemberModule } from '../member/member.module';
import { ProductDetailRepository, ProductDetailRepositoryProvider, ProductRepository, ProductRepositoryProvider } from './repositories';
import { CreateProductConverter } from './converter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductDetail]),
    MemberModule,
  ],
  providers: [
    ProductService, 
    ProductResolver, 
    ProductRepository, 
    ProductRepositoryProvider,
    ProductDetailRepository,
    ProductDetailRepositoryProvider,
    CreateProductConverter,
  ]
})
export class ProductModule {}
