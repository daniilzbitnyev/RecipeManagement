import { RecipeModel } from '@models';
import { ReviewModel } from 'models/ReviewModel';

export type RecipeModelResponse = {
  recipes: RecipeModel[];
  totalPages: number;
};

export type ReviewModelResponse = {
  reviews: ReviewModel[];
  totalPages: number;
  totalCount: number;
};