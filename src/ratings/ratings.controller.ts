import { BadRequestException, Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingDto } from './dto/rating.dto';
import { RatingValidationPipe } from '../common/pipes/ratingValidation.pipe';
import { Rating } from 'src/common/types/rating.type';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  getRatingForCoffeeType(@Query('coffeeType') coffeeType: string): Rating {
    const lastRatedCoffeeType: Rating | undefined = this.ratingsService.getRatingForCoffeeType(coffeeType);
    if(!lastRatedCoffeeType) {
      throw new BadRequestException('Coffee type not rated yet');
    }
    return lastRatedCoffeeType;
  }

  @Post()
  addRating(@Body(RatingValidationPipe) newRating: RatingDto): Rating {
    return this.ratingsService.addRating(newRating);
  }

  @Get('coffee-types')
  ratedCoffeeTypes() {
    return this.ratingsService.getRatedCoffeeTypes()
  }
}
