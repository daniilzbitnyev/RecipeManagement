import authStore from '@stores/authStore';
import { convertToFormDataCookingStep } from 'helpers/apiHelper';
import { CookingStepModel } from 'models/CookingStepModel';
import { ErrorResponse } from './authService';

const BASE = `${process.env.REACT_APP_API_URL}/api/cookingStep`;

export const fetchCookingStep = async (
  id: string,
): Promise<CookingStepModel | null> => {
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
    console.error('Error get CookingStep:', error);
    return null;
  }
};

export const createCookingStep = async (
  cookingStep: CookingStepModel,
): Promise<string[] | void> => {
  const formData = convertToFormDataCookingStep(cookingStep);

  const response = await fetch(`${BASE}`, {
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

export const updateCookingStep = async (
  cookingStep: CookingStepModel,
): Promise<void> => {
  try {
    const formData = convertToFormDataCookingStep(cookingStep);

    const res = await fetch(`${BASE}/${cookingStep.id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (err) {
    console.error('Error update CookingStep:', err);
  }
};

export const deleteCookingStep = async (id: string): Promise<void> => {
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
    console.error('Error delete cooking step:', err);
  }
};
