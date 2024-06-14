import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex items-center justify-center h-full w-full flex-col'>
      <div className="text-white">
        <p>Not Found</p>
      </div>
      <div className='text-white'>
        <p>
          Please come back to register page{' '}
          <NavLink to="/registration" className="text-blue-500">
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
