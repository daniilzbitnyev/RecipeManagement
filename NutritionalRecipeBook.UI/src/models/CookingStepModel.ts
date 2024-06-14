import { PhotoModel } from './PhotoModel';

export interface CookingStepModel {
  id?: string;
  numberStep: number;
  title: string;
  description: string;
  photos?: PhotoModel[];
  recipeId?: string;
}
