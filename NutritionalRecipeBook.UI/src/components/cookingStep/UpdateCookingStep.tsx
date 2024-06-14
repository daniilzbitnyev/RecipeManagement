import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import cookingStepStore from '@stores/cookingStepStore';

import { CookingStepModel } from 'models/CookingStepModel';
import { PhotoModel } from 'models/PhotoModel';
import { fetchCookingStep, updateCookingStep } from 'services/cookinStepService';

const UpdateCookingStep = (): ReactElement => {
  const navigate = useNavigate();

  const { cookingStepId } = useParams();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
  const numberStepRef = useRef<HTMLInputElement | null>(null);

  const [cookingStep, setCookingStep] = useState<CookingStepModel>();
  const [photos, setPhotos] = useState<PhotoModel[]>([]);

  useEffect(() => {
    if (cookingStepId) {
      fetchCookingStep(cookingStepId).then(
        (data) => data && setCookingStep(data),
      ).catch((e) => console.log(e));
      setPhotos(cookingStepStore.getPhotosCookingStep(cookingStepId) || []);
    }
  }, []);

  const handleCreateCookingStepClick = () => {
    const updatedCookingStep: CookingStepModel = {
      id: cookingStep?.id,
      title: titleRef.current?.value || '',
      description: descRef.current?.value || '',
      numberStep: parseInt(numberStepRef.current?.value || '0'),
      photos: photos,
      recipeId: cookingStep?.recipeId
    };

      updateCookingStep(updatedCookingStep).then(() => {
        cookingStepStore.updateOne(updatedCookingStep);
        navigate(`/recipe/${cookingStep?.recipeId}`);
      }).catch((e) => console.log(e));
  };

  return (
    <div className="max-w-sm">
      <button
        className="mb-5 text-white"
        onClick={() => navigate(`/recipe/${cookingStep?.recipeId}`)}
      >
        {'< Back to Home'}
      </button>
      <h1 className="text-white text-3xl mt-2 mb-5 font-bold">
        Update Cooking Step
      </h1>
      <div className="mb-5">
        <label
          htmlFor="number_step"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Number Step
        </label>
        <input
          type="text"
          id="number_step"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="1, 2, 3.."
          defaultValue={cookingStep?.numberStep}
          ref={numberStepRef}
        />
      </div>
      <div className="mb-5">
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
          placeholder="Some title..."
          defaultValue={cookingStep?.title}
          ref={titleRef}
        />
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
          placeholder="Some description..."
          defaultValue={cookingStep?.description}
          ref={descRef}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Photos
        </label>
        <div>
          {photos.map((photo, index) => (
            <div key={index}>
              <img src={photo.imageSrc} alt={photo.title} width={100} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleCreateCookingStepClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
};

export default UpdateCookingStep;
