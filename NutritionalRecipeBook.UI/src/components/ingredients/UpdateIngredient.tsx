import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ingredientStore from '@stores/ingredientStore';

import { IngredientModel } from 'models/IngredientModel';
import { fetchIngredient, updateIngredient } from 'services/ingredientService';

const UpdateIngredient = () => {
  const navigate = useNavigate();

  const { ingredientId } = useParams();

  const quantityRef = useRef<HTMLInputElement | null>(null);
  const productNameRef = useRef<HTMLInputElement | null>(null);
  const measurementTypeRef = useRef<HTMLInputElement | null>(null);

  const [ingredient, setIngredient] = useState<IngredientModel>();

  useEffect(() => {
    if (ingredientId) {
      fetchIngredient(ingredientId).then((data) => data && setIngredient(data)).catch((e) => console.log(e));
    }
  }, []);

  const handleCreateIngredientClick = () => {
    const ingredient: IngredientModel = {
      id: ingredientId,
      quantity: parseFloat(quantityRef.current?.value || '0.0'),
      product: {
        name: productNameRef.current?.value || '',
      },
      measurement: {
        name: measurementTypeRef.current?.value || '',
      },
      recipeId: ingredientId || '',
    };

    updateIngredient(ingredient).then(() => {
      navigate(`/recipe/${ingredient?.recipeId}`);
      ingredientStore.updateOne(ingredient);
    });
  };

  return (
    <div className="max-w-sm">
      <button
        className="mb-5 text-white"
        onClick={() => navigate(`/recipe/${ingredient?.recipeId}`)}
      >
        {'< Back to Home'}
      </button>
      <h1 className="text-white text-3xl mt-2 mb-5 font-bold">
        Update Ingredient
      </h1>
      <div className="mb-5">
        <label
          htmlFor="quantity"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Quantity
        </label>
        <input
          type="text"
          id="quantity"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="1, 2, 3.."
          defaultValue={ingredient?.quantity}
          ref={quantityRef}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="product_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Product Name
        </label>
        <input
          type="text"
          id="product_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tomato, Pineapple..."
          defaultValue={ingredient?.product?.name || ''}
          ref={productNameRef}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="measurement_type"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Measurement Type
        </label>
        <input
          type="text"
          id="measurement_type"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="kg, gr..."
          defaultValue={ingredient?.measurement?.name || ''}
          ref={measurementTypeRef}
        />
      </div>
      <button
        onClick={handleCreateIngredientClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
};

export default UpdateIngredient;
