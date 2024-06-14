import { RecipeModel } from '@models';

import { CookingStepModel } from 'models/CookingStepModel';

export default function convertToFormData(recipe: RecipeModel): FormData {
  const formData = new FormData();
  formData.append('title', recipe.title);
  formData.append('description', recipe.description);

  if (recipe.calorie) {
    formData.append('calorie', recipe?.calorie?.toString());
  }

  formData.append('recipeCategory.name', recipe?.recipeCategory?.name || '');

  if (recipe.preparationTimeInMinutes) {
    formData.append(
      'preparationTimeInMinutes',
      recipe?.preparationTimeInMinutes?.toString() || '',
    );
  }

  if (recipe.cookingTimeInMinutes) {
    formData.append(
      'cookingTimeInMinutes',
      recipe?.cookingTimeInMinutes?.toString() || '',
    );
  }

  if (recipe.servingSize) {
    formData.append('servingSize', recipe?.servingSize?.toString() || '');
  }

  if (recipe?.video?.data) {
    formData.append('video.title', recipe?.video.title || '');
    formData.append('video.data', recipe?.video.data || '');
  }

  if (recipe?.photo?.data) {
    formData.append('photo.title', recipe?.photo.title || '');
    formData.append('photo.data', recipe?.photo.data || '');
  }

  if (recipe.cookingSteps) {
    formData.append('cookingSteps', JSON.stringify(recipe.cookingSteps));
  }

  if (recipe.ingredients) {
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
  }

  formData.append('ownerId', recipe.ownerId);

  return formData;
}

export function convertToFormDataCookingStep(
  cookingStep: CookingStepModel,
): FormData {
  const formData = new FormData();
  formData.append('title', cookingStep.title);
  formData.append('description', cookingStep.description);
  formData.append('numberStep', cookingStep.numberStep.toString());

  if (cookingStep.photos && cookingStep.photos.length > 0) {
    cookingStep.photos.forEach((photo, index) => {
      if (photo.data) {
        formData.append(
          `photos[${index}].data`,
          photo.data,
          photo.imageName || `photo_${index}`,
        );
        if (photo.title) {
          formData.append(`photos[${index}].title`, photo.title);
        }
      }
    });
  }

  if (cookingStep.recipeId) {
    formData.append('recipeId', cookingStep.recipeId);
  }

  return formData;
}

const getErrorMessages = (field: string, errors: string[]): string[] => {
  const filteredErrors = errors.filter((error) =>
    error.toLowerCase().includes(field.toLowerCase()),
  );
  return filteredErrors.length > 0 ? filteredErrors : [];
};

export const getUniqueErrorMessages = (
  fieldNames: string[],
  errors: string[],
): string[] => {
  const uniqueErrorMessages: string[] = [];

  fieldNames.forEach((fieldName) => {
    const errorMessages = getErrorMessages(fieldName, errors);
    errorMessages.forEach((errorMessage) => {
      if (!uniqueErrorMessages.includes(errorMessage)) {
        uniqueErrorMessages.push(errorMessage);
      }
    });
  });

  return uniqueErrorMessages;
};
