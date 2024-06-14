import React, { ReactElement } from 'react';

import { StarRatingChooseProps } from './types';

const StarRaitingChoose = ({
  totalStars,
  onRate,
  hover,
  setHover,
  setRating,
  rating
}: StarRatingChooseProps): ReactElement => {
  const handleClick = (index: number) => {
    setRating(index);
    if (onRate) onRate(index);
  };

  const handleMouseEnter = (index: number) => {
    setHover(index);
  };
  
  const handleMouseLeave = () => {
    setHover(0);
  };

  return (
    <div className="flex space-x-1 mb-2">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={`text-2xl cursor-pointer transition-colors ${
              starValue <= (hover || rating)
                ? 'text-yellow-400'
                : 'text-gray-400'
            }`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRaitingChoose;
