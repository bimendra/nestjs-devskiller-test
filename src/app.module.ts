import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RatingsModule } from './ratings/ratings.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { MockApiModule } from './mock-api/mock-api.module';

@Module({
  imports: [RatingsModule, RecommendationModule, MockApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
