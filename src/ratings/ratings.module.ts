import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { MockApiService } from '../mock-api/mock-api.service';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService, MockApiService],
})
export class RatingsModule {}
