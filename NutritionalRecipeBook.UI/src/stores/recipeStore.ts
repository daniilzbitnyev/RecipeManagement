import { makeAutoObservable } from 'mobx';

import { RecipeModel } from '@models';

import { fetchRecipes } from 'services/recipeService';

export class RecipeStore {
  recipes: RecipeModel[] = [];
  currentPage = 0;
  totalPages: number[] = [];
  calorieCount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  getAllRecipes(): RecipeModel[] {
    return this.recipes;
  }

  addRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes;
  }

  setCalorieCount(calorie: number) {
    this.calorieCount = calorie;
  }

  updateCurrentPage(num: number) {
    this.currentPage = num;
  }

  updateTotalPages(num: number[]) {
    this.totalPages = num;
  }

  async deleteRecipe() {
    const res = await fetchRecipes(this.currentPage, '', '', false);
    this.recipes = res?.recipes || [];
    if (res?.totalPages) {
      this.totalPages = Array.from(
        { length: res.totalPages },
        (_, index) => index + 1,
      );
    }
  }
}

const store = new RecipeStore();
export default store;
