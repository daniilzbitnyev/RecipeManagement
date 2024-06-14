import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { RecipeModel } from '@models';
import authStore from '@stores/authStore';

import { RecipeFormProps } from './types';
import { RecipeCategoryModel } from 'models/RecipeCategoryModel';
import { fetchRecipeCategories } from 'services/recipeCategoryService';
import { fetchRecipe } from 'services/recipeService';

const RecipeForm: React.FC<RecipeFormProps> = ({
  id,
  title,
  onSubmit,
  isUpdateForm,
  errors,
}) => {
  const navigate = useNavigate();

  const calorieRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
  const preparationTimeInMinutesRef = useRef<HTMLInputElement | null>(null);
  const cookingTimeInMinutesRef = useRef<HTMLInputElement | null>(null);
  const servingSizeRef = useRef<HTMLInputElement | null>(null);
  const videoTitleRef = useRef<HTMLInputElement | null>(null);
  const photoTitleRef = useRef<HTMLInputElement | null>(null);

  const [recipeExist, setRecipeExist] = useState<RecipeModel>();
  const [category, setCategory] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File>(new File([], ''));
  const [categories, setCategories] = useState<RecipeCategoryModel[]>([]);

  useEffect(() => {
    if (id) {
      fetchRecipe(id)
        .then((data) => {
          if (data) {
            setRecipeExist(data);
            if (isUpdateForm) {
              setCategory(data.recipeCategory?.name || '');
            }
          }
        })
        .catch((e) => console.log(e));
    }
    fetchRecipeCategories()
      .then((data) => data && setCategories(data))
      .catch((e) => console.log(e));
  }, []);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
    }
  };

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedVideo(file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const recipe: RecipeModel = {
      id: id || '',
      title: titleRef.current?.value || '',
      description: descRef.current?.value || '',
      calorie: parseInt(calorieRef.current?.value || '') || null,
      preparationTimeInMinutes: parseInt(
        preparationTimeInMinutesRef.current?.value || '',
      ),
      cookingTimeInMinutes: parseInt(
        cookingTimeInMinutesRef.current?.value || '',
      ),
      servingSize: parseInt(servingSizeRef.current?.value || '1'),
      video: {
        title: videoTitleRef.current?.value || '',
        data: selectedVideo || null,
      },
      photo: {
        title: photoTitleRef.current?.value || '',
        data: selectedPhoto || null,
      },
      recipeCategory: {
        name: category || recipeExist?.recipeCategory?.name || '',
      },
      ownerId: authStore.getUserId(),
    };

    onSubmit(recipe);
  };

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleBackArrow = () => {
    navigate('/home');
  };

  const getErrorMessage = (field: string): string | null => {
    const error = errors?.find((error) =>
      error.toLowerCase().includes(field.toLowerCase()),
    );
    return error || null;
  };

  return (
    <>
      <form className="max-w-sm" onSubmit={handleSubmit}>
        <button className="text-white" onClick={handleBackArrow}>
          {'< Back to Home'}
        </button>
        <h1 className="text-white text-3xl mt-2 mb-5 font-bold">{title}</h1>
        <div className="flex jusity-center items-start w-full h-full">
          <div className="mr-10">
            <div className="mb-5 w-96">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={(isUpdateForm && recipeExist?.title) || ''}
                ref={titleRef}
                placeholder="Title..."
              />
              {getErrorMessage('title') && (
                <p className="text-red-500 text-sm mt-1">Title is required.</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={(isUpdateForm && recipeExist?.description) || ''}
                ref={descRef}
                placeholder="Description..."
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="calorie"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Calorie
              </label>
              <input
                type="number"
                id="calorie"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={(isUpdateForm && recipeExist?.calorie) || ''}
                ref={calorieRef}
                placeholder="0, 1, 2..."
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="video_title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Video Title
              </label>
              <input
                accept="video/*"
                type="text"
                id="video_title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={(isUpdateForm && recipeExist?.video?.title) || ''}
                ref={videoTitleRef}
                placeholder="Video title..."
              />
            </div>
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="video_tutor"
              >
                Upload video tutorial
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="video_tutor_help"
                id="video_tutor"
                type="file"
                defaultValue={
                  (isUpdateForm && recipeExist?.video?.videoName) || ''
                }
                onChange={handleVideoChange}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="photo_title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Photo Title
              </label>
              <input
                accept="image/*"
                type="text"
                id="photo_title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={(isUpdateForm && recipeExist?.photo?.title) || ''}
                ref={photoTitleRef}
                placeholder="Photo title..."
              />
            </div>
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="photo_tutor"
              >
                Upload photo
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="photo_tutor_help"
                id="photo_tutor"
                type="file"
                defaultValue={
                  (isUpdateForm && recipeExist?.photo?.imageName) || ''
                }
                onChange={handlePhotoChange}
              />
            </div>
          </div>
          <div>
            <div className="mb-5 w-96">
              <label
                htmlFor="recipe_category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose a recipe category
              </label>
              <select
                id="recipe_category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleOptionChange}
                value={category}
              >
                <option>Choose a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {getErrorMessage('name') && (
                <p className="text-red-500 text-sm mt-1">
                  Recipe category is required.
                </p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="preparation_time_in_minutes"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Preparation Time In Minutes
              </label>
              <input
                type="number"
                id="preparation_time_in_minutes"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={
                  (isUpdateForm && recipeExist?.preparationTimeInMinutes) || ''
                }
                ref={preparationTimeInMinutesRef}
                placeholder="0, 1, 3..."
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="cooking_time_in_minutes"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cooking Time In Minutes
              </label>
              <input
                type="number"
                id="cooking_time_in_minutes"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={
                  (isUpdateForm && recipeExist?.cookingTimeInMinutes) || ''
                }
                ref={cookingTimeInMinutesRef}
                placeholder="0, 1, 3..."
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="serving_size"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Serving Size
              </label>
              <input
                type="number"
                id="serving_size"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={(isUpdateForm && recipeExist?.servingSize) || ''}
                ref={servingSizeRef}
                placeholder="0, 1, 3..."
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RecipeForm;
