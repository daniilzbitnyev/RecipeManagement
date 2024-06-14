import { observer } from 'mobx-react';
import React, { ReactElement, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import authStore from '@stores/authStore';
import cookingStepStore from '@stores/cookingStepStore';

import { CookingStepListProps } from './types';
import CookingStepListItem from 'components/listItems/CookingStepListItem';
import { fetchRecipe } from 'services/recipeService';

const CookingStepList = observer(
  ({ recipeId }: CookingStepListProps): ReactElement => {
    const [recipeOwnerId, setRecipeOwnerId] = useState<string>();
    const [storageOwnerId] = useState<string>(authStore.getUserId());

    useEffect(() => {
      fetchRecipe(recipeId)
        .then((data) => data && setRecipeOwnerId(data.ownerId))
        .catch((e) => console.error(e));
    }, [recipeId]);

    return (
      <>
        <div>
          <div className="flex items-center w-22 h-12">
            <p>Cooking Steps:</p>
            {recipeOwnerId == storageOwnerId && (
              <NavLink
                to={`/create-cooking-step/${recipeId}`}
                className="cursor-pointer ml-5 bg-blue-700 w-8 h-8 flex justify-center items-center rounded-md"
              >
                <AddIcon />
              </NavLink>
            )}
          </div>
          {cookingStepStore.getAll().length !== 0 && (
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Step Number</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Photos</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {cookingStepStore.getAll().map((el) => (
                  <CookingStepListItem key={el.id} cookingStep={el} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  },
);

export default CookingStepList;
