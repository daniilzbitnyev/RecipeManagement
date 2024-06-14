import React, { ReactElement, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { RegisterModel } from 'models/RegisterModel';
import { signUp } from 'services/authService';

const Registration = (): ReactElement => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSignUpButtonClick = () => {
    const user: RegisterModel = {
      username: usernameRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };

    signUp(user)
      .then((data) => {
        if (typeof data == 'string') {
          alert(data);
        } else {
          if (data) {
            setErrors(data);
          }
        }
      })
      .catch((e) => console.error(e));
  };

  const getErrorMessages = (field: string): string[] => {
    const filteredErrors = errors.filter((error) =>
      error.toLowerCase().includes(field.toLowerCase()),
    );
    return filteredErrors.length > 0 ? filteredErrors : [];
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <div className="w-96 m-auto">
            <div>
              <label
                htmlFor="user_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User name
              </label>
              <input
                type="text"
                id="user_name"
                className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John123"
                required
                ref={usernameRef}
              />
              {getErrorMessages('username').map((errorMessage, index) => (
                <p key={index} className="text-red-500 text-sm mt-1">
                  {errorMessage}
                </p>
              ))}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="example@gmail.com"
                required
                ref={emailRef}
              />
              {getErrorMessages('email').map((errorMessage, index) => (
                <p key={index} className="text-red-500 text-sm mt-1">
                  {errorMessage}
                </p>
              ))}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="**********"
                required
                ref={passwordRef}
              />
              {getErrorMessages('password').map((errorMessage, index) => (
                <p key={index} className="text-red-500 text-sm mt-1">
                  {errorMessage}
                </p>
              ))}
            </div>
            <button
              onClick={handleSignUpButtonClick}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign up
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-5">
              Already have an account?{' '}
              <NavLink
                to="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
