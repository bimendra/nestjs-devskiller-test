import { RatingDto } from "src/ratings/dto/rating.dto";

export function ratingDto(overrides?: Partial<RatingDto>): RatingDto {
  return {
    coffeeType: 'any coffee type',
    starRating: '1/5',
    ...overrides,
  };
}
