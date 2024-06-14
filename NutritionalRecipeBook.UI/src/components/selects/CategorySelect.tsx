import React, { ReactElement, useEffect, useState } from 'react';

import { CategorySelectProps } from './types';
import { RecipeCategoryModel } from 'models/RecipeCategoryModel';
import { fetchRecipeCategories } from 'services/recipeCategoryService';

const CategorySelect = ({ setCategory }: CategorySelectProps): ReactElement => {
  const [categories, setCategories] = useState<RecipeCategoryModel[]>([]);

  useEffect(() => {
    fetchRecipeCategories()
      .then((data) => data && setCategories(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <select
        onChange={(e) => setCategory(e.target.value)}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultChecked>Choose a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CategorySelect;
