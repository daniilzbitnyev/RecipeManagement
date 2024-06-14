import { makeAutoObservable } from 'mobx';

import { IngredientModel } from 'models/IngredientModel';

export class IngredientStore {
  ingredients: IngredientModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAll(): IngredientModel[] {
    return this.ingredients;
  }

  setAll(ingredients: IngredientModel[]) {
    this.ingredients = ingredients;
  }

  addOne(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
  }

  updateOne(ingredient: IngredientModel) {
    const index = this.ingredients.findIndex((t) => t.id == ingredient.id);
    if (index > -1) {
      this.ingredients[index] = ingredient;
    }
  }

  deleteOne(id: string) {
    const index = this.ingredients.findIndex((t) => t.id == id);
    if (index > -1) {
      this.ingredients.splice(index, 1);
    }
  }
}

const ingredientStore = new IngredientStore();
export default ingredientStore;
