import { CookingStepModel } from './CookingStepModel';
import { IngredientModel } from './IngredientModel';
import { PhotoModel } from './PhotoModel';
import { RecipeCategoryModel } from './RecipeCategoryModel';
import { ReviewModel } from './ReviewModel';
import { VideoModel } from './VideoModel';

export interface RecipeModel {
  id?: string;
  title: string;
  description: string;
  calorie: number | null;
  video: VideoModel | null;
  recipeCategory: RecipeCategoryModel | null;
  preparationTimeInMinutes: number | null;
  cookingTimeInMinutes: number | null;
  servingSize: number | null;
  photo: PhotoModel | null;
  avgRaiting?: number;
  isFavourite?: boolean;
  cookingSteps?: CookingStepModel[];
  ingredients?: IngredientModel[];
  reviews?: ReviewModel[];
  ownerId: string;
}
