import React, { ReactElement } from 'react';

import { RecipeModel } from '@models';

import { RecipeListProps } from './types';
import RecipeListItem from 'components/listItems/RecipeListItem';

const RecipeList = ({ recipes }: RecipeListProps): ReactElement => {
  return (
    <div className="flex justify-center flex-col">
      {recipes?.map((el: RecipeModel) => (
        <div key={el.id}>
          <RecipeListItem recipe={el} />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
