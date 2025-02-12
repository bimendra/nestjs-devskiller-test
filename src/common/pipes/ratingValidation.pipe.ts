import { ArgumentMetadata, Injectable, NotAcceptableException, PipeTransform } from "@nestjs/common";
import { RatingDto } from "src/ratings/dto/rating.dto";

@Injectable()
export class RatingValidationPipe implements PipeTransform {
  /**
   * Transforms and validates the rating.
   * 
   * @param {RatingDto} newRating - The new rating to be validated.
   * @param {ArgumentMetadata} metadata - Metadata about the argument.
   * @returns {RatingDto} The validated rating.
   * @throws {NotAcceptableException} If the rating format or values are incorrect.
   */
  transform(newRating: RatingDto, metadata: ArgumentMetadata): RatingDto {
    const starRating = newRating.starRating.trim();
    const slashIndex = starRating.indexOf('/');

    if (slashIndex === -1 || starRating.indexOf('/', slashIndex + 1) !== -1) {
      throw new NotAcceptableException('Rating format is incorrect');
    }

    const rating = parseInt(starRating.slice(0, slashIndex));
    const maxRating = parseInt(starRating.slice(slashIndex + 1));

    if(isNaN(rating) || isNaN(maxRating)) {
      throw new NotAcceptableException('Rating values should be numbers');
    }

    if(rating < 1 || rating > 5) {
      throw new NotAcceptableException('Rating should be between 1 and 5');
    }

    if(maxRating !== 5) {
      throw new NotAcceptableException('Max rating should be 5');
    }

    return {
      coffeeType: newRating.coffeeType,
      starRating: newRating.starRating
    };
  }
}