import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import cookingStepStore from '@stores/cookingStepStore';

import { getUniqueErrorMessages } from 'helpers/apiHelper';
import { CookingStepModel } from 'models/CookingStepModel';
import { PhotoModel } from 'models/PhotoModel';
import { createCookingStep } from 'services/cookinStepService';

const CreateCookingStep = () => {
  const navigate = useNavigate();

  const { recipeId } = useParams();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
  const numberStepRef = useRef<HTMLInputElement | null>(null);

  const [photos, setPhotos] = useState<PhotoModel[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos: PhotoModel[] = Array.from(files).map((file) => ({
        title: file.name,
        data: file,
        imageName: file.name,
        imageSrc: URL.createObjectURL(file),
      }));
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleCreateCookingStepClick = () => {
    const cookingStep: CookingStepModel = {
      title: titleRef.current?.value || '',
      description: descRef.current?.value || '',
      numberStep: parseInt(numberStepRef.current?.value || '0'),
      photos: photos,
      recipeId: recipeId || '',
    };

    createCookingStep(cookingStep)
      .then((data) => {
        if (Array.isArray(data)) {
          setErrors(data);
        } else {
          cookingStepStore.addOne(cookingStep);
          navigate(`/recipe/${recipeId}`);
        }
      })
      .catch((e) => console.log(e));
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
        Add Cooking Step
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
          required
          ref={numberStepRef}
        />
        {errors &&
          getUniqueErrorMessages(['number'], errors).map(
            (errorMessage, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">
                {errorMessage}
              </p>
            ),
          )}
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
          required
          ref={titleRef}
        />
        {errors &&
          getUniqueErrorMessages(['number'], errors).map(
            (errorMessage, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">
                {errorMessage}
              </p>
            ),
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
          placeholder="Some description..."
          required
          ref={descRef}
        />
        {errors &&
         getUniqueErrorMessages(['number'], errors).map((errorMessage, index) => (
            <p key={index} className="text-red-500 text-sm mt-1">
              {errorMessage}
            </p>
          ))}
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Photos
        </label>
        <input type="file" multiple onChange={handleFileChange} />
        <div>
          {photos.map((photo, index) => (
            <div key={index}>
              <img src={photo.imageSrc} alt={photo.title} width={100} />
              <button onClick={() => handleRemovePhoto(index)}>Remove</button>
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

export default CreateCookingStep;
