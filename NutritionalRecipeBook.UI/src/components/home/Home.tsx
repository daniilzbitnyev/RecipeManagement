import { observer } from 'mobx-react';
import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { RecipeModel } from '@models';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import authStore from '@stores/authStore';
import store from '@stores/recipeStore';
import { DefaultTotalRecipesForDownload } from '@utils/constants';

import SearchInput from 'components/inputs/SearchInput';
import RecipeList from 'components/lists/RecipeList';
import CategorySelect from 'components/selects/CategorySelect';
import {
  exportRecipesFile,
  fetchRecipes,
  fetchRecipesWithMinAndMaxCalories,
  fetchRecipesWithPageSize,
  importRecipeFile,
} from 'services/recipeService';

const Home = observer((): ReactElement => {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [minCalorie, setMinCalorie] = useState<number>(0);
  const [maxCalorie, setMaxCalorie] = useState<number>(0);
  const [error] = useState<string>('You cannot input negative integers.');
  const [isNegative, setIsNegative] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchRecipes(store.currentPage, category, search)
      .then((data) => {
        if (data) {
          store.addRecipes(data.recipes);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (category == 'Choose a category') {
      setCategory('');
    }

    fetchRecipes(store.currentPage, category, search, isFavourite)
      .then((data) => {
        if (data) {
          store.addRecipes(data.recipes);
        }
      })
      .catch((err) => console.error(err));
  }, [category]);

  useEffect(() => {
    fetchRecipes(store.currentPage, category, search, isFavourite)
      .then((data) => {
        if (data) {
          store.addRecipes(data.recipes);
          store.updateTotalPages(
            Array.from({ length: data.totalPages }, (_, index) => index + 1),
          );
        }
      })
      .catch((err) => console.error(err));
  }, [store.currentPage, search, category, isFavourite]);

  useEffect(() => {
    if (!Number.isNaN(maxCalorie) || !Number.isNaN(minCalorie)) {
      fetchRecipesWithMinAndMaxCalories(
        store.currentPage,
        category,
        search,
        minCalorie,
        maxCalorie,
        isFavourite,
      )
        .then((data) => {
          if (data) {
            store.addRecipes(data.recipes);
            store.updateTotalPages(
              Array.from({ length: data.totalPages }, (_, index) => index + 1),
            );
          }
        })
        .catch((err) => console.error(err));
    } else {
      fetchRecipes(store.currentPage, category, search, isFavourite)
        .then((data) => {
          if (data) {
            store.addRecipes(data.recipes);
            store.updateTotalPages(
              Array.from({ length: data.totalPages }, (_, index) => index + 1),
            );
          }
        })
        .catch((err) => console.error(err));
    }
  }, [minCalorie, maxCalorie, isFavourite]);

  const logout = () => {
    authStore.removeToken();
    navigate('/login');
  };

  const changeMinValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value || '0');

      if (value < 0) {
        setIsNegative(true);
      } else {
        setIsNegative(false);
        setMinCalorie(value);
      }
    },
    [minCalorie],
  );

  const changeMaxValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value || '0');

      if (value < 0) {
        setIsNegative(true);
      } else {
        setIsNegative(false);
        setMaxCalorie(value);
      }
    },
    [maxCalorie],
  );

  const handleJsonFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      handleJsonFileUploadedClick(file);
    }
  };
  const handleJsonFileUploadedClick = (file: File) => {
    importRecipeFile(file)
      .then(() => refreshRecipes())
      .catch((e) => console.error(e));
  };

  const refreshRecipes = () => {
    fetchRecipes(store.currentPage, category, search)
      .then((data) => {
        if (data) {
          store.addRecipes(data.recipes);
          store.updateTotalPages(
            Array.from({ length: data.totalPages }, (_, index) => index + 1),
          );
          clearFileInput();
        }
      })
      .catch((err) => console.error(err));
  };

  const handleExportFile = () => {
    if (!Number.isNaN(maxCalorie) || !Number.isNaN(minCalorie)) {
      fetchRecipesWithMinAndMaxCalories(
        store.currentPage,
        category,
        search,
        minCalorie,
        maxCalorie,
        isFavourite,
        DefaultTotalRecipesForDownload,
      )
        .then((data) => {
          if (data) {
            handleExportRecipesFile(data.recipes);
          }
        })
        .catch((err) => console.error(err));
    } else {
      fetchRecipesWithPageSize(
        store.currentPage,
        category,
        search,
        DefaultTotalRecipesForDownload,
      )
        .then((data) => {
          if (data) {
            handleExportRecipesFile(data.recipes);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleExportRecipesFile = (recipes: RecipeModel[]) => {
    exportRecipesFile(recipes)
      .then((data) => {
        if (data) {
          const blob = new Blob([JSON.stringify(data)], {
            type: 'application/json',
          });

          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = 'recipes.json';

          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      })
      .catch((e) => console.log(e));
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavourite(event.target.checked);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-center items-center mb-5 mt-5">
        <div
          onClick={logout}
          className="cursor-pointer ml-5 bg-blue-700 w-48 h-10 mr-5 flex justify-center items-center rounded-md text-white"
        >
          <ExitToAppIcon />
        </div>
        <CategorySelect setCategory={setCategory} />
        <SearchInput setSearch={setSearch} />
        <NavLink
          to={'/create-recipe'}
          className="ml-6 min-w-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create new
        </NavLink>
      </div>

      <div className="w-full flex flex-col mb-5 ml-24">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Set max and min calorie
        </label>
        <div className="flex justify-between w-11/12">
          <div className="flex">
            <input
              type="number"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={changeMinValue}
              placeholder="Min calorie..."
            />
            <input
              type="number"
              id="title"
              className="ml-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={changeMaxValue}
              placeholder="Max calorie..."
            />
          </div>

          <div className="">
            <label
              htmlFor="file_input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Import file
            </label>
            <input
              ref={fileInputRef}
              className="block w-60 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={handleJsonFileChange}
            />
          </div>
          <button
            className="min-w-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleExportFile}
          >
            Download recipes
          </button>
          <div className="d-flex items-center">
            <label htmlFor="favourite_list" className="text-white text-xs mr-5">
              Show only favourite
            </label>
            <input
              id="favourite_list"
              type="checkbox"
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-start w-full ml-20">
        {isNegative && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <RecipeList recipes={store.getAllRecipes()} />

      <nav aria-label="Page navigation example">
        <ul className="flex items-center space-x-2 h-8 text-sm">
          {store.totalPages.map((num) => (
            <li key={num + 1}>
              <p
                onClick={() => store.updateCurrentPage(num)}
                className="flex items-center justify-center px-4 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
              >
                {num}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

export default Home;
