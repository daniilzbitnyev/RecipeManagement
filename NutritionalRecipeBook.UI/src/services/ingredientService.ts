import authStore from '@stores/authStore';

import { IngredientModel } from 'models/IngredientModel';
import { ErrorResponse } from './authService';

const BASE = `${process.env.REACT_APP_API_URL}/api/ingredient`;

export const fetchIngredient = async (
  id: string,
): Promise<IngredientModel | null> => {
  try {
    const response = await fetch(`${BASE}/${id}`, {
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
    console.error('Error get ingredient:', error);
    return null;
  }
};

export const createIngredient = async (
  ingredient: IngredientModel,
): Promise<string[] | void> => {
  const response = await fetch(`${BASE}`, {
    method: 'POST',
    body: JSON.stringify(ingredient),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authStore.token}`,
    },
  });


  if (!response.ok) {
    const data: ErrorResponse = await response.json();

    if (data.errors) {
      const errorMessages = Object.values(data.errors).flat();
      return errorMessages;
    }
  }
};

export const updateIngredient = async (
  ingredient: IngredientModel,
): Promise<void> => {
  try {
    const res = await fetch(`${BASE}/${ingredient.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        quantity: ingredient.quantity,
        product: {
          name: ingredient.product.name,
        },
        measurement: {
          name: ingredient.measurement.name,
        },
        recipeId: ingredient.recipeId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (err) {
    console.error('Error update ingredient:', err);
  }
};


export const deleteIngredient = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${BASE}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (err) {
    console.error('Error delete ingredient:', err);
  }
};

