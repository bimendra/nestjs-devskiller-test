import { IsNotEmpty, IsString } from "class-validator";

export class RatingDto {
  @IsNotEmpty()
  @IsString()
  coffeeType!: string;

  @IsNotEmpty()
  @IsString()
  starRating!: string;
}