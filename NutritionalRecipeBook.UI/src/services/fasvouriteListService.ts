import authStore from '@stores/authStore';

import { ErrorResponse } from './authService';
import { FavouriteListModel } from 'models/FavouriteListModel';

const BASE = `${process.env.REACT_APP_API_URL}/api/favouriteList`;

export const addToFavouriteList = async (
  favouriteList: FavouriteListModel,
): Promise<string[] | void> => {
  const response = await fetch(`${BASE}`, {
    method: 'POST',
    body: JSON.stringify(favouriteList),
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

export const deleteFromFavouriteList = async (recipeId: string): Promise<void> => {
  try {
    const res = await fetch(`${BASE}/${authStore.userId}/${recipeId}`, {
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
    console.error('Error delete cooking step:', err);
  }
};
