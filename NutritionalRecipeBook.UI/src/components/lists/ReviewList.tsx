import { observer } from 'mobx-react';
import React, { ReactElement, useRef, useState } from 'react';

import reviewStore from '@stores/reviewStore';

import { ReviewListProps } from './types';
import ReviewListItem from 'components/listItems/ReviewListItem';
import StarRaitingChoose from 'components/starRating/StarRaitingChoose';
import { getUniqueErrorMessages } from 'helpers/apiHelper';
import { ReviewModel } from 'models/ReviewModel';
import { createReview, fetchReviews } from 'services/reviewService';

const ReviewList = observer(
  ({ recipeId, ownerId }: ReviewListProps): ReactElement => {
    const textRef = useRef<HTMLTextAreaElement | null>(null);

    const [rate, setRate] = useState<number>(0);
    const [errors, setErrors] = useState<string[]>([]);
    const [hover, setHover] = useState<number>(0);
    const [rating, setRating] = useState<number>(0)

    const handleRating = (rating: number) => {
      setRate(rating);
    };

    const handlePostClick = () => {
      const review: ReviewModel = {
        rate: rate,
        comment: {
          text: textRef.current?.value || '',
        },
        recipeId: recipeId,
        ownerId: ownerId,
      };

      createReview(review)
        .then((data) => {
          if (Array.isArray(data)) {
            setErrors(data);
          } else {
            setErrors([]);
            handleRating(0)
            setHover(0)
            setRating(0)
            refreshReviews();
            cleanForms();
          }
        })
        .catch((e) => console.error(e));
    };

    const refreshReviews = () => {
      if (recipeId) {
        fetchReviews(reviewStore.currentPage, recipeId)
          .then((data) => {
            if (data) {
              reviewStore.setTotalCount(data.totalCount)
              reviewStore.setAll(data.reviews);
              reviewStore.updateTotalPages(
                Array.from(
                  { length: data.totalPages },
                  (_, index) => index + 1,
                ),
              );
            }
          })
          .catch((err) => console.error(err));
      }
    };

    const cleanForms = () => {
      if (textRef.current) {
        textRef.current.value = '';
      }
    };

    return (
      <section className="py-8 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({reviewStore.totalCount})
            </h2>
          </div>
          <div className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                ref={textRef}
              ></textarea>
            </div>
            {getUniqueErrorMessages(['comment'], errors).map(
              (errorMessage, index) => (
                <p key={index} className="text-red-500 text-sm mt-1">
                  {errorMessage}
                </p>
              ),
            )}
            <StarRaitingChoose totalStars={5} onRate={handleRating} setHover={setHover} hover={hover} setRating={setRating} rating={rating}/>
            <button
              className="min-w-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handlePostClick}
            >
              Post comment
            </button>
          </div>
          <div>
            {reviewStore.getAll().map((el: ReviewModel) => (
              <div key={el.id}>
                <ReviewListItem review={el} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);

export default ReviewList;
