import authStore from '@stores/authStore';

import { IngredientModel } from 'models/IngredientModel';

const BASE = `${process.env.REACT_APP_API_URL}/api/nutritional`;

export const fetchAndUpdateRecipeCalorie = async (
  ingredients: IngredientModel[],
  recipeId: string,
): Promise<number | void> => {
  if (ingredients.length !== 0) {
    try {
      const response = await fetch(`${BASE}`, {
        method: 'POST',
        body: JSON.stringify({
          ingredients,
          recipeId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetch and update recipe calorie:', error);
    }
  }
};
