import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RecipeModel } from '@models';

import RecipeForm from './RecipeForm';
import { updateRecipe } from 'services/recipeService';

const UpdateRecipe = (): ReactElement => {
  const navigate = useNavigate();

  const { recipeId } = useParams();

  const onSubmit = async (recipe: RecipeModel) => {
    updateRecipe(recipe).then(() => {
      handleBackArrow();
    }).catch((e) => console.log(e));
  };

  const handleBackArrow = () => {
    navigate('/home');
  };

  return (
    <RecipeForm
      id={recipeId}
      title="Update Recipe"
      onSubmitSuccessMessage="Successfully updated"
      onSubmit={onSubmit}
      isUpdateForm={true}
    />
  );
};

export default UpdateRecipe;
