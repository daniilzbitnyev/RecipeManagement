import authStore from '@stores/authStore';

import { RecipeCategoryModel } from 'models/RecipeCategoryModel';

const BASE = `${process.env.REACT_APP_API_URL}/api`;

export const fetchRecipeCategories = async (): Promise<
  RecipeCategoryModel[] | null
> => {
  try {
    const response = await fetch(`${BASE}/recipeCategory`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error get all recipe categories:', error);
    return null;
  }
};
