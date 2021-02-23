import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { MemberRepository } from '../member/repositories';
import { CreateProductConverter } from './converter';
import { CreateProductArgs } from './dto';
import { ProductDetailRepository, ProductRepository } from './repositories';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private memberRepository: MemberRepository,
    private productDetailRepository: ProductDetailRepository,
    private createProductConverter: CreateProductConverter,
  ) {}

  @Transactional()
  async createProduct(memberId: number, createProductArgs: CreateProductArgs) {
    try {
      const foundMember = await this.memberRepository.findById(memberId);
      if(!foundMember) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Not found a member by ${memberId}`
          },
          HttpStatus.NOT_FOUND
        )
      }
      const createDetails = async () => {
        return Promise.all(
          createProductArgs.details.map(async (detail, idx)=> {
            const newDetail = await this.productDetailRepository.create({
              ...detail,
              ordering: idx
            });
            await this.productDetailRepository.save(newDetail);
            return newDetail;
          })
        )
      }

      const newProduct = await this.productRepository.create({
        name: createProductArgs.name,
        price: createProductArgs.price,
        stock: createProductArgs.stock,
        details: await createDetails(),
        owner: foundMember
      });
      await this.productRepository.save(newProduct);
      return await this.createProductConverter.convert(newProduct);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
