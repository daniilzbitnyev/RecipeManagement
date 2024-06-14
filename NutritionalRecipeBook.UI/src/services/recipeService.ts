import { RecipeModel } from '@models';
import authStore from '@stores/authStore';

import { ErrorResponse } from './authService';
import convertToFormData from 'helpers/apiHelper';
import { RecipeModelResponse } from 'types/api';

const BASE = `${process.env.REACT_APP_API_URL}/api`;

export const fetchRecipes = async (
  pageNumber: number,
  category: string | '',
  search: string | '',
  isFavourite = false
): Promise<RecipeModelResponse | void> => {
  try {
    const response = await fetch(
      `${BASE}/recipe?${isFavourite ? `userId=${authStore.userId}&` : ''}pageNumber=${pageNumber > 0 ? pageNumber - 1 : pageNumber}&pageSize=3&category=${category}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error get all recipes:', error);
  }
};

export const fetchRecipesWithMinAndMaxCalories = async (
  pageNumber: number,
  category: string | '',
  search: string | '',
  minCalorie: number,
  maxCalorie: number,
  isFavourite = false,
  pageSize = 3,
): Promise<RecipeModelResponse | void> => {
  try {
    const response = await fetch(
      `${BASE}/recipe?${isFavourite ? `userId=${authStore.userId}&` : ''}pageNumber=${pageNumber > 0 ? pageNumber - 1 : pageNumber}&pageSize=${pageSize}&category=${category}&search=${search}&minCalorie=${minCalorie}&maxCalorie=${maxCalorie}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error get all recipes:', error);
  }
};

export const fetchRecipesWithPageSize = async (
  pageNumber: number,
  category: string | '',
  search: string | '',
  pageSize = 3,
  isFavourite = false,
): Promise<RecipeModelResponse | void> => {
  try {
    const response = await fetch(
      `${BASE}/recipe?${isFavourite ? `userId=${authStore.userId}&` : ''}pageNumber=${pageNumber > 0 ? pageNumber - 1 : pageNumber}&pageSize=${pageSize}&category=${category}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error get all recipes:', error);
  }
};

export const fetchRecipe = async (id: string): Promise<RecipeModel | null> => {
  try {
    const response = await fetch(`${BASE}/recipe/${id}/${authStore.userId}`, {
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
    console.error('Error get recipe:', error);
    return null;
  }
};

export const exportRecipeFile = async (
  recipeId: string,
): Promise<string | void> => {
  const response = await fetch(`${BASE}/recipe/export/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};

export const importRecipeFile = async (jsonFile: File): Promise<void> => {
  const formData: FormData = new FormData();

  formData.append('file', jsonFile);
  formData.append('ownerId', authStore.userId);

  const response = await fetch(`${BASE}/recipe/import/`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
};

export const exportRecipesFile = async (
  recipes: RecipeModel[],
): Promise<string | void> => {
  console.log(recipes);
  const response = await fetch(`${BASE}/recipe/export/`, {
    method: 'POST',
    body: JSON.stringify({ recipes }),
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
};

export const createRecipe = async (
  recipe: RecipeModel,
): Promise<string[] | void> => {
  const formData: FormData = convertToFormData(recipe);

  const response = await fetch(`${BASE}/recipe`, {
    method: 'POST',
    body: formData,
    headers: {
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

export const updateRecipe = async (
  recipe: RecipeModel,
): Promise<string[] | void> => {
  const formData: FormData = convertToFormData(recipe);

  const response = await fetch(`${BASE}/recipe/${recipe.id}`, {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  if (!response.ok) {
    const data: ErrorResponse = await response.json();

    if (data.errors) {
      const errorMessages = Object.values(data.errors).flat();
      return errorMessages;
    }
  }
};

export const deleteRecipe = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${BASE}/recipe/${id}`, {
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
    console.error('Error delete recipe:', err);
  }
};
