import React, { ReactElement } from 'react';

import { Rating } from '@mui/material';

import { StarRaitingProps } from './types';

const StarRaiting = ({ raiting }: StarRaitingProps): ReactElement => {
  return (
    <div className='mt-2'>
      <p className='text-white'>Average rating</p>
      <Rating name="simple-controlled" value={raiting} readOnly/>
    </div>
  );
};

export default StarRaiting;
