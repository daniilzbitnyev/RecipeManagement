import { observer } from 'mobx-react';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RecipeModel } from '@models';
import authStore from '@stores/authStore';
import cookingStepStore from '@stores/cookingStepStore';
import ingredientStore from '@stores/ingredientStore';
import store from '@stores/recipeStore';
import reviewStore from '@stores/reviewStore';

import CookingStepList from 'components/lists/CookingStepList';
import IngredientList from 'components/lists/IngredientList';
import ReviewList from 'components/lists/ReviewList';
import { FavouriteListModel } from 'models/FavouriteListModel';
import {
  addToFavouriteList,
  deleteFromFavouriteList,
} from 'services/fasvouriteListService';
import { fetchAndUpdateRecipeCalorie } from 'services/nutritionalService';
import { exportRecipeFile, fetchRecipe } from 'services/recipeService';
import { fetchReviews } from 'services/reviewService';

const Recipe = observer((): ReactElement => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<RecipeModel>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (recipeId) {
      fetchRecipe(recipeId)
        .then((data) => {
          if (data) {
            setRecipe(data);
            if (data.ingredients) {
              ingredientStore.setAll(data.ingredients);
            }
            if (data.cookingSteps) {
              cookingStepStore.setAll(data.cookingSteps);
            }
            store.setCalorieCount(recipe?.calorie || 0);
            setIsLoading(false);
            if (data.isFavourite) {
              setIsChecked(data.isFavourite);
            }
          }
        })
        .catch((e) => console.log(e));

      fetchReviews(reviewStore.currentPage, recipeId)
        .then((data) => {
          if (data) {
            reviewStore.setTotalCount(data.totalCount);
            reviewStore.setAll(data.reviews);
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    if (recipeId) {
      fetchReviews(reviewStore.currentPage, recipeId)
        .then((data) => {
          if (data) {
            reviewStore.setTotalCount(data.totalCount);
            reviewStore.setAll(data.reviews);
            reviewStore.updateTotalPages(
              Array.from({ length: data.totalPages }, (_, index) => index + 1),
            );
          }
        })
        .catch((err) => console.error(err));
    }
  }, [reviewStore.currentPage]);

  useEffect(() => {
    if (recipe?.ingredients && recipe.id) {
      fetchAndUpdateRecipeCalorie(recipe?.ingredients, recipe?.id)
        .then((data) => {
          if (data) {
            store.setCalorieCount(data);
          }
          setIsLoading(false);
        })
        .catch((e) => console.log(e));
    }
    if (recipeId) {
      fetchReviews(reviewStore.currentPage, recipeId)
        .then((data) => {
          if (data) {
            reviewStore.setTotalCount(data.totalCount);
            reviewStore.setAll(data.reviews);
            reviewStore.updateTotalPages(
              Array.from({ length: data.totalPages }, (_, index) => index + 1),
            );
          }
        })
        .catch((err) => console.error(err));
    }
  }, [recipe]);

  const handleBackArrow = () => {
    navigate('/home');
  };

  const handleExportFile = () => {
    exportRecipeFile(recipeId || '')
      .then((data) => {
        if (data) {
          const blob = new Blob([JSON.stringify(data)], {
            type: 'application/json',
          });

          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = 'recipe.json';

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleAddToFavouriteList = () => {
    const favouriteList: FavouriteListModel = {
      recipesId: recipeId || '',
      usersId: authStore.userId,
    };
    addToFavouriteList(favouriteList)
      .then(() => {
        setIsChecked(true);
      })
      .catch((e) => console.error(e));
  };

  const handleRemoveFromFavouriteList = () => {
    if (recipeId) {
      deleteFromFavouriteList(recipeId)
        .then(() => setIsChecked(false))
        .catch((e) => console.error(e));
    }
  };

  return (
    <div className="text-white">
      <div className="w-full flex justify-between items-center">
        <button className="mb-5" onClick={handleBackArrow}>
          {'< Back to Home'}
        </button>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="favoriteCheckbox"
            checked={isChecked}
            onChange={
              isChecked
                ? handleRemoveFromFavouriteList
                : handleAddToFavouriteList
            }
            className="hidden peer"
          />
          <label
            htmlFor="favoriteCheckbox"
            className="cursor-pointer rounded-md p-2 transition-colors duration-200"
          >
            {isChecked ? (
              <svg
                className="w-6 h-6 text-red-500 transition-colors duration-200 peer-checked:text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-500 transition-colors duration-200 peer-checked:text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </label>
        </div>
      </div>
      <h1 className="text-2xl mb-5">Recipe Information: </h1>
      <p>Title: {isLoading ? 'Loading...' : recipe?.title}</p>
      <p>Description: {isLoading ? 'Loading...' : recipe?.description}</p>
      <p>Calorie: {store.calorieCount}</p>
      {isLoading
        ? 'Loading...'
        : recipe?.video && (
            <p>
              Video:{' '}
              <p>
                Video Title: {isLoading ? 'Loading...' : recipe?.video?.title}
              </p>
              <video
                controls
                src={isLoading ? 'Loading...' : recipe?.video?.videoSrc}
              >
                <source
                  src={isLoading ? 'Loading...' : recipe?.video?.videoSrc}
                  type="video/mp4"
                />
              </video>
            </p>
          )}
      <p>
        Recipe Category:{' '}
        {isLoading ? 'Loading...' : recipe?.recipeCategory?.name}
      </p>
      <p>
        Preparation Time In Minutes:{' '}
        {isLoading ? 'Loading...' : recipe?.preparationTimeInMinutes}
      </p>
      <p>
        Cooking Time In Minutes:{' '}
        {isLoading ? 'Loading...' : recipe?.cookingTimeInMinutes}
      </p>
      <p>Serving Size: {isLoading ? 'Loading...' : recipe?.servingSize}</p>
      {isLoading
        ? 'Loading...'
        : recipe?.photo && (
            <p>
              Photo:{' '}
              <p>
                Photo Title: {isLoading ? 'Loading...' : recipe?.photo?.title}
              </p>
              <img
                src={isLoading ? 'Loading...' : recipe?.photo?.imageSrc}
                alt="Recipe"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </p>
          )}
      {isLoading ? (
        'Loading...'
      ) : (
        <CookingStepList recipeId={recipe?.id || ''} />
      )}
      {isLoading ? (
        'Loading...'
      ) : (
        <IngredientList recipeId={recipe?.id || ''} />
      )}
      <button
        className="min-w-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleExportFile}
      >
        Download recipe
      </button>
      <ReviewList recipeId={recipe?.id || ''} ownerId={recipe?.ownerId || ''} />

      <nav aria-label="Page navigation example">
        <ul className="flex justify-center items-center space-x-2 h-8 text-sm">
          {reviewStore.totalPages.map((num) => (
            <li key={num + 1}>
              <p
                onClick={() => reviewStore.updateCurrentPage(num)}
                className="flex items-center justify-center px-4 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
              >
                {num}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

export default Recipe;
