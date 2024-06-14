import React, { ReactElement, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import authStore from '@stores/authStore';
import cookingStepStore from '@stores/cookingStepStore';

import { CookingStepListItemProps } from './types';
import { deleteCookingStep } from 'services/cookinStepService';
import { fetchRecipe } from 'services/recipeService';
import { observer } from 'mobx-react';

const CookingStepListItem = observer(({
  cookingStep,
}: CookingStepListItemProps): ReactElement => {
  const [recipeOwnerId, setRecipeOwnerId] = useState<string>();
  const [storageOwnerId] = useState<string>(authStore.getUserId());

  useEffect(() => {
    fetchRecipe(cookingStep.recipeId || '')
      .then((data) => data && setRecipeOwnerId(data.ownerId))
      .catch((e) => console.error(e));
  }, [cookingStep]);

  const handleDeleteIcon = () => {
    deleteCookingStep(cookingStep.id || '')
      .then(() => cookingStepStore.deleteOne(cookingStep.id || ''))
      .catch((e) => console.error(e));
  };

  return (
    <tr>
      <td className="px-4 py-2 border">{cookingStep.numberStep}</td>
      <td className="px-4 py-2 border">{cookingStep.title}</td>
      <td className="px-4 py-2 border">{cookingStep.description}</td>
      <td className="px-4 py-2 border">
        <ul>
          {cookingStep.photos?.map((photo) => (
            <li key={photo.id} className="mb-2">
              <p>Photo Title: {photo?.title}</p>
              <img
                src={photo?.imageSrc}
                alt="Recipe"
                className="max-w-xs h-auto"
              />
            </li>
          ))}
        </ul>
      </td>
      <td className="px-4 py-2 border">
        {recipeOwnerId === storageOwnerId && (
          <div className='flex justify-center items-center'>
            <NavLink
              to={`/update-cooking-step/${cookingStep.id}`}
              className="cursor-pointer bg-blue-700 text-white w-8 h-8 flex justify-center items-center rounded-md"
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
      </td>
    </tr>
  );
});

export default CookingStepListItem;
