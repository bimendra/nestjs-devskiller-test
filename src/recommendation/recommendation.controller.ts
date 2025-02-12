import { Controller, Get } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { Recommendation } from '../common/types/recommendation.type';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationsService: RecommendationService) {}

  @Get()
  getCoffeeTypeRecommendation(): Recommendation {
    return this.recommendationsService.getCoffeeTypeRecommendation();
  }
}
