import { MeasurementTypeModel } from './MeasurementTypeModel';
import { ProductModel } from './ProductModel';

export interface IngredientModel {
  id?: string;
  quantity: number;
  product: ProductModel;
  measurement: MeasurementTypeModel;
  recipeId: string;
}
