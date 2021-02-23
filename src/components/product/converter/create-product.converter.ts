import { Injectable } from "@nestjs/common";
import { Convert, Converter } from '@fabio.formosa/metamorphosis';
import { Product, ProductDetail } from "../entities";
import { Context } from "@nestjs/graphql";

class DetailResponseDto {
  id: number;
  title: string;
  contents: string;
  ordering: number;
  createdAt: Date;
  updatedAt: Date;
}

@Convert(ProductDetail, DetailResponseDto)
class DetailConverter implements Converter<ProductDetail, DetailResponseDto> {
  convert(source: ProductDetail): DetailResponseDto {
    if(!source) return null;
    const target = new DetailResponseDto();
    target.id = source.id;
    target.title = source.title;
    target.contents = source.contents;
    target.ordering = source.ordering;
    target.createdAt = source.createdAt;
    target.updatedAt = source.updatedAt;
    return target;
  }
}


export class CreateProductResponseDto {
  id: number;
  name: string;
  price: number;
  stock: number;
  details: DetailResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
@Convert(Product, CreateProductResponseDto)
export class CreateProductConverter implements Converter<Product, CreateProductResponseDto> {
  detailConverter: DetailConverter;
  constructor() {
    this.detailConverter = new DetailConverter();
  }
  convert(source: Product): CreateProductResponseDto {
    if(!source) return null;
    const target = new CreateProductResponseDto();
    target.id = source.id;
    target.name = source.name;
    target.price = source.price;
    target.stock = source.stock;
    target.details = source.details.map(detail => this.detailConverter.convert(detail));
    target.createdAt = source.createdAt;
    target.updatedAt = source.updatedAt;
    return target;
  }
}