import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import authStore from '@stores/authStore';
import ingredientStore from '@stores/ingredientStore';

import { IngredientListItemProps } from './types';
import { deleteIngredient } from 'services/ingredientService';
import { fetchRecipe } from 'services/recipeService';

const IngredientListItem = observer(
  ({ ingredient }: IngredientListItemProps) => {
    const [recipeOwnerId, setRecipeOwnerId] = useState<string>();
    const [storageOwnerId] = useState<string>(authStore.getUserId());

    useEffect(() => {
      fetchRecipe(ingredient.recipeId || '')
        .then((data) => data && setRecipeOwnerId(data.ownerId))
        .catch((e) => console.error(e));
    }, [ingredient]);

    const handleDeleteIcon = () => {
      deleteIngredient(ingredient.id || '')
        .then(() => ingredientStore.deleteOne(ingredient.id || ''))
        .catch((e) => console.error(e));
    };

    return (
      <li key={ingredient.id} className="mb-5 flex items-center">
        <div className="min-w-20">
          <p>
            {ingredient.quantity}{' '}
            {ingredient.measurement && (
              <span>{ingredient.measurement.name}</span>
            )}{' '}
            {ingredient.product.name}{' '}
          </p>
        </div>
        {recipeOwnerId == storageOwnerId && (
          <div className="flex">
            <NavLink
              to={`/update-ingredient/${ingredient.id}`}
              className="cursor-pointer ml-5 bg-blue-700 w-8 h-8 flex justify-center items-center rounded-md"
            >
              <EditIcon />
            </NavLink>
            <div
              className="cursor-pointer ml-2 bg-blue-700 w-8 h-8 flex justify-center items-center rounded-md"
              onClick={handleDeleteIcon}
            >
              <DeleteIcon className="text-white" />
            </div>
          </div>
        )}
      </li>
    );
  },
);

export default IngredientListItem;
