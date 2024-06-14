import { observer } from 'mobx-react';
import React, { ReactElement, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import authStore from '@stores/authStore';
import store from '@stores/recipeStore';

import { RecipeListItemProps } from './types';
import StarRaiting from 'components/starRating/StarRaiting';
import { FavouriteListModel } from 'models/FavouriteListModel';
import {
  addToFavouriteList,
  deleteFromFavouriteList,
} from 'services/fasvouriteListService';
import { deleteRecipe, fetchRecipe } from 'services/recipeService';

const RecipeListItem = observer(
  ({ recipe }: RecipeListItemProps): ReactElement => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
      if (recipe.id) {
        fetchRecipe(recipe.id)
          .then((data) => {
            if (data) {
              if (data.isFavourite) {
                setIsChecked(data.isFavourite);
              }
            }
          })
          .catch((e) => console.log(e));
      }
    }, []);

    const handleDeleteIcon = () => {
      if (recipe.id) {
        deleteRecipe(recipe.id)
          .then(() => {
            if (recipe.id) {
              store.deleteRecipe();
            }
          })
          .catch((e) => console.log(e));
      }
    };

    const handleAddToFavouriteList = () => {
      const favouriteList: FavouriteListModel = {
        recipesId: recipe.id || '',
        usersId: authStore.userId,
      };
      addToFavouriteList(favouriteList)
        .then(() => {
          setIsChecked(true);
        })
        .catch((e) => console.error(e));
    };

    const handleRemoveFromFavouriteList = () => {
      if (recipe.id) {
        deleteFromFavouriteList(recipe.id)
          .then(() => setIsChecked(false))
          .catch((e) => console.error(e));
      }
    };

    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5">
        <div className="p-5">
          <NavLink to={`/recipe/${recipe.id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {recipe.title}
            </h5>
          </NavLink>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {recipe.description}
          </p>
          <div className="flex items-center">
            <NavLink
              to={`/recipe/${recipe.id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </NavLink>
            <NavLink
              to={`/update-recipe/${recipe.id}`}
              className="cursor-pointer ml-5 bg-blue-700 w-8 h-8 flex justify-center items-center rounded-md text-white"
            >
              <EditIcon />
            </NavLink>
            <div
              className="cursor-pointer ml-2 bg-blue-700 w-8 h-8 flex justify-center items-center rounded-md"
              onClick={handleDeleteIcon}
            >
              <DeleteIcon className="text-white" />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`favoriteCheckbox-${recipe.id}`}
                checked={isChecked}
                onChange={
                  isChecked
                    ? handleRemoveFromFavouriteList
                    : handleAddToFavouriteList
                }
                className="hidden peer"
              />
              <label
                htmlFor={`favoriteCheckbox-${recipe.id}`}
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
          {recipe?.avgRaiting ? (
            <StarRaiting raiting={recipe.avgRaiting} />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  },
);

export default RecipeListItem;
