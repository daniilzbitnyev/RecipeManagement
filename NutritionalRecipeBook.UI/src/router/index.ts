import { lazy } from 'react';

import { Paths } from '@utils/constants';

import { TRoute } from 'types/route';

const Home = lazy(() => import('../components/home/Home'));
const CreateRecipe = lazy(() => import('../components/recipe/CreateRecipe'));
const UpdateRecipe = lazy(() => import('../components/recipe/UpdateRecipe'));
const RecipePage = lazy(() => import('../components/recipe/Recipe'));
const CreateIngredient = lazy(
  () => import('../components/ingredients/CreateIngredient'),
);
const UpdateIngredient = lazy(
  () => import('../components/ingredients/UpdateIngredient'),
);

const CreateCookingStep = lazy(
  () => import('../components/cookingStep/CreateCookingStep'),
);
const UpdateCookingStep = lazy(
  () => import('../components/cookingStep/UpdateCookingStep'),
);

const routes = [
  {
    name: 'Home',
    path: Paths.HOME,
    Component: Home,
  },
  {
    name: 'CreateRecipe',
    path: Paths.CREATE_RECIPE,
    Component: CreateRecipe,
  },
  {
    name: 'UpdateRecipe',
    path: Paths.UPDATE_RECIPE,
    Component: UpdateRecipe,
  },
  {
    name: 'RecipePage',
    path: Paths.RECIPE_PAGE,
    Component: RecipePage,
  },
  {
    name: 'CreateIngredient',
    path: Paths.CREATE_INGREDIENT,
    Component: CreateIngredient,
  },
  {
    name: "UpdateIngredient",
    path: Paths.UPDATE_INGREDIENT,
    Component: UpdateIngredient
  },
  {
    name: 'CreateCookingStep',
    path: Paths.CREATE_COOKING_STEP,
    Component: CreateCookingStep,
  },
  {
    name: "UpdateCookingStep",
    path: Paths.UPDATE_COOKING_STEP,
    Component: UpdateCookingStep
  },
] as TRoute[];

export default routes;
