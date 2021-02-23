import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

class InputProductDetail {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  contents: string;
}

@ArgsType()
export class CreateProductArgs {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsInt()
  @IsNotEmpty()
  price: number;

  @Field()
  @IsInt()
  @IsNotEmpty()
  stock: number;

  @Field()
  @IsArray()
  details: InputProductDetail[];
}