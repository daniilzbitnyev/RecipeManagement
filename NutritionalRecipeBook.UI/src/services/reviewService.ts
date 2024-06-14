import authStore from '@stores/authStore';

import { ErrorResponse } from './authService';
import { ReviewModel } from 'models/ReviewModel';
import { ReviewModelResponse } from 'types/api';

const BASE = `${process.env.REACT_APP_API_URL}/api/review`;

export const fetchReviews = async (
  pageNumber: number,
  recipeId: string
): Promise<ReviewModelResponse | void> => {
  try {
    const response = await fetch(
      `${BASE}?pageNumber=${pageNumber > 0 ? pageNumber - 1 : pageNumber}&pageSize=3&recipeId=${recipeId}`,
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
    console.error('Error get all reviews:', error);
  }
};

export const createReview = async (
  review: ReviewModel,
): Promise<string[] | void> => {
  const response = await fetch(`${BASE}`, {
    method: 'POST',
    body: JSON.stringify(review),
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
