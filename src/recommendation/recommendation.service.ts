import { Injectable } from '@nestjs/common';
import { Rating } from 'src/common/types/rating.type';
import { Recommendation } from '../common/types/recommendation.type';
import { MockApiService } from '../mock-api/mock-api.service';

@Injectable()
export class RecommendationService {
  constructor(private readonly apiService: MockApiService) {}

  getCoffeeTypeRecommendation(): Recommendation {
    const allRatings: Array <Rating> = this.apiService.getRatings();
    const ratingsForRecommendation: Array<Rating> = allRatings.slice(0, allRatings.length-1);
    const recommendedRating: Rating | undefined = ratingsForRecommendation
      .filter((rating: Rating) => rating.starRating === '4/5' || rating.starRating === '5/5')
      .shift();
    if(!recommendedRating) {
      return {
        message: 'NO_RECOMMENDATIONS_AVAILABLE'
      };
    }
    return {
      coffeeType: recommendedRating.coffeeType,
    };
  }
}
