import { Injectable } from '@nestjs/common';
import { MockApiService } from '../mock-api/mock-api.service';
import { RatingDto } from './dto/rating.dto';
import { Rating } from '../common/types/rating.type';

@Injectable()
export class RatingsService {
  constructor(private apiService: MockApiService) {}

  addRating(newRating: RatingDto): Rating {
    return this.apiService.addRating(newRating);
  }

  getRatingForCoffeeType(coffeeType: string) {
    const allRatings: Array <Rating> = this.apiService.getRatings();
    const lastRatedCoffeeType: Rating | undefined = allRatings
      .filter((rating: Rating) => rating.coffeeType === coffeeType)
      .pop();
    return lastRatedCoffeeType;
  }

  getRatedCoffeeTypes(): Array <string> {
    const allRatings: Array <Rating> = this.apiService.getRatings();
    return [...new Set<string>(allRatings.map((rating: Rating) => rating.coffeeType))];
  }
}
