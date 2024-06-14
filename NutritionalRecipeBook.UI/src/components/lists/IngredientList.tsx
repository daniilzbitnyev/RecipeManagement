import React, { ReactElement, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import ingredientStore from '@stores/ingredientStore';

import { IngredientListProps } from './types';
import IngredientListItem from 'components/listItems/IngredientListItem';
import authStore from '@stores/authStore';
import { fetchRecipe } from 'services/recipeService';
import { observer } from 'mobx-react';

const IngredientList = observer(({ recipeId }: IngredientListProps): ReactElement => {
  const [recipeOwnerId, setRecipeOwnerId] = useState<string>();
  const [storageOwnerId] = useState<string>(authStore.getUserId());

  useEffect(() => {
    fetchRecipe(recipeId)
      .then((data) => data && setRecipeOwnerId(data.ownerId))
      .catch((e) => console.error(e));
  }, [recipeId]);

  return (
    <div>
      <div className="flex items-center w-12 h-12">
        <p>Ingredients:</p>
        {storageOwnerId == recipeOwnerId && <NavLink
          to={`/create-ingredient/${recipeId}`}
          className="cursor-pointer ml-5 bg-blue-700 w-8 h-8 flex justify-center items-center rounded-md"
        >
          <AddIcon />
        </NavLink>}
      </div>
      <ul>
        {ingredientStore.getAll().map((el) => (
          <IngredientListItem key={el.id} ingredient={el} />
        ))}
      </ul>
    </div>
  );
});

export default IngredientList;
