import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { RatingDto } from "src/ratings/dto/rating.dto";

@Injectable()
export class RatingValidationPipe implements PipeTransform {
  transform(newRating: RatingDto, metadata: ArgumentMetadata): RatingDto {
    if(!newRating.coffeeType || !newRating.starRating) {
      throw new BadRequestException('Coffee type and rating are required');
    }

    const starRating = newRating.starRating.trim();
    const slashIndex = starRating.indexOf('/');

    if (slashIndex === -1 || starRating.indexOf('/', slashIndex + 1) !== -1) {
      throw new BadRequestException('Rating format is incorrect');
    }

    const rating = parseInt(starRating.slice(0, slashIndex));
    const maxRating = parseInt(starRating.slice(slashIndex + 1));

    if(isNaN(rating) || isNaN(maxRating)) {
      throw new BadRequestException('Rating values should be numbers');
    }

    if(rating < 1 || rating > 5) {
      throw new BadRequestException('Rating should be between 1 and 5');
    }

    if(maxRating !== 5) {
      throw new BadRequestException('Max rating should be 5');
    }

    return {
      coffeeType: newRating.coffeeType,
      starRating: newRating.starRating
    };
  }
}