import { RecipeModel } from '@models';

export type RecipeListProps = {
  recipes: RecipeModel[];
};

export type IngredientListProps = {
  recipeId: string;
};

export type CookingStepListProps = {
  recipeId: string;
};

export type ReviewListProps = {
  recipeId: string;
  ownerId: string;
};
