import { PHONE_NUMBER_REGEX, USER_PASSWORD_REGEX } from "@ecommerce/core/utils/regex";
import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

@ArgsType()
export class SignUpArgs {
  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(PHONE_NUMBER_REGEX)
  phoneNumber: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(USER_PASSWORD_REGEX)
  password: string;
}