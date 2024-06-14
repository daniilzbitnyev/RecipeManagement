import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RecipeModel } from '@models';

import RecipeForm from './RecipeForm';
import { createRecipe } from 'services/recipeService';

const CreateRecipe = (): ReactElement => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (recipe: RecipeModel) => {
    createRecipe(recipe).then((data) => {
      if (typeof data == 'undefined') {
        handleBackArrow();
      } else {
        setErrors(data);
      }
    }).catch((e) => console.log(e));
  };

  const handleBackArrow = () => {
    navigate('/home');
  };

  return (
    <RecipeForm
      title="Create Recipe"
      onSubmitSuccessMessage="Successfully added"
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};

export default CreateRecipe;
