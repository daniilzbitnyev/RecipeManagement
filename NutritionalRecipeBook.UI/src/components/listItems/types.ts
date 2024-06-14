import { RecipeModel } from '@models';

import { CookingStepModel } from 'models/CookingStepModel';
import { IngredientModel } from 'models/IngredientModel';
import { ReviewModel } from 'models/ReviewModel';

export type RecipeListItemProps = {
  recipe: RecipeModel;
};

export type IngredientListItemProps = {
  ingredient: IngredientModel;
};

export type CookingStepListItemProps = {
  cookingStep: CookingStepModel;
};

export type ReviewListItemProps = {
  review: ReviewModel;
};
