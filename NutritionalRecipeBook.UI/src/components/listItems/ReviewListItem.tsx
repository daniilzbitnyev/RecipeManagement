import React, { ReactElement } from 'react';

import { ReviewListItemProps } from './types';
import StarRaiting from 'components/starRating/StarRaiting';

const ReviewListItem = ({ review }: ReviewListItemProps): ReactElement => {
  return (
    <div>
      <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-800">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              {review.ownerUserName}
            </p>
          </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">
          {review.comment.text}
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <StarRaiting raiting={review.rate} />
        </div>
      </article>
    </div>
  );
};

export default ReviewListItem;
