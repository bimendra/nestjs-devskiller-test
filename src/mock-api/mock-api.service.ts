import { Injectable } from "@nestjs/common";
import { Rating } from "src/common/types/rating.type";


@Injectable()
export class MockApiService {
  private ratings: Array <Rating> = [];

  addRating(newRating: Rating): Rating {
    this.ratings.push(newRating);
    return newRating;
  }

  getRatings(): Array<Rating> {
    return this.ratings;
  }
}