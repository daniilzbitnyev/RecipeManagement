import { observer } from 'mobx-react';
import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ingredientStore from '@stores/ingredientStore';

import { getUniqueErrorMessages } from 'helpers/apiHelper';
import { IngredientModel } from 'models/IngredientModel';
import { MeasurementTypeModel } from 'models/MeasurementTypeModel';
import { createIngredient } from 'services/ingredientService';
import { fetchMeasurementType } from 'services/measurementTypeService';

const CreateIngredient = observer((): ReactElement => {
  const navigate = useNavigate();

  const { recipeId } = useParams<{ recipeId: string }>();

  const quantityRef = useRef<HTMLInputElement | null>(null);
  const productNameRef = useRef<HTMLInputElement | null>(null);

  const [measurementType, setMeasurementType] = useState<string>('');
  const [measurementTypes, setMeasurementTypes] = useState<
    MeasurementTypeModel[]
  >([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    fetchMeasurementType().then((data) => data && setMeasurementTypes(data));
  }, []);

  const handleCreateIngredientClick = () => {
    const ingredient: IngredientModel = {
      quantity: parseFloat(quantityRef.current?.value || '-1'),
      product: {
        name: productNameRef.current?.value || '',
      },
      measurement: {
        name: measurementType || '',
      },
      recipeId: recipeId || '',
    };

    createIngredient(ingredient)
      .then((data) => {
        if (Array.isArray(data)) {
          setErrors(data);
        } else {
          ingredientStore.addOne(ingredient);
          navigate(`/recipe/${recipeId}`);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMeasurementType(e.target.value);
  };

  return (
    <div className="max-w-sm">
      <button
        className="mb-5 text-white"
        onClick={() => navigate(`/recipe/${recipeId}`)}
      >
        {'< Back to Home'}
      </button>
      <h1 className="text-white text-3xl mt-2 mb-5 font-bold">
        Add Ingredient
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
          required
          ref={quantityRef}
        />
        {errors &&
          getUniqueErrorMessages(['quantity'], errors).map(
            (errorMessage, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">
                {errorMessage}
              </p>
            ),
          )}
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
          required
          ref={productNameRef}
        />
        {errors &&
          getUniqueErrorMessages(['product'], errors).map(
            (errorMessage, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">
                {errorMessage}
              </p>
            ),
          )}
      </div>
      <div className="mb-5 w-96">
        <label
          htmlFor="measurement_type"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Choose a measurement type
        </label>
        <select
          id="measurement_type"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleOptionChange}
        >
          <option>Choose a measurement type</option>
          {measurementTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleCreateIngredientClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
});

export default CreateIngredient;
