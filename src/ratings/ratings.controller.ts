import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingDto } from './dto/rating.dto';
import { RatingValidationPipe } from '../common/pipes/ratingValidation.pipe';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  addRating(@Body(RatingValidationPipe) newRating: RatingDto) {
    return this.ratingsService.addRating(newRating);
  }

  @Get('coffee-types')
  ratedCoffeeTypes() {
    return this.ratingsService.getRatedCoffeeTypes()
  }
}
