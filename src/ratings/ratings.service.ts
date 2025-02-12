import { Injectable } from '@nestjs/common';
import { MockApiService } from 'src/mock-api/mock-api.service';
import { RatingDto } from './dto/rating.dto';
import { Rating } from 'src/common/types/rating.type';

@Injectable()
export class RatingsService {
  constructor(private apiService: MockApiService) {}

  addRating(newRating: RatingDto): Rating {
    return this.apiService.addRating(newRating);
  }
}
