import { observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import authStore from '@stores/authStore';

import { LoginModel } from 'models/LoginModel';
import { LoginResponse, signIn } from 'services/authService';

const Login = observer(() => {
  const navigate = useNavigate();

  const usernameOrEmailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleLoginClick = () => {
    const loginModel: LoginModel = {
      userNameOrEmail: usernameOrEmailRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };

    signIn(loginModel)
      .then((data: string | string[] | LoginResponse) => {
        setErrors([]);
        if (typeof data !== 'string' && !Array.isArray(data)) {
          authStore.isAuthed();
          authStore.setToken(data.token);
          authStore.setUserId(data.id);

          navigate('/home');
        }
        if (typeof data == 'string') {
          setError(data);
        }
        if (Array.isArray(data)) {
          setErrors(data);
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

  const getUniqueErrorMessages = (fieldNames: string[]): string[] => {
    const uniqueErrorMessages: string[] = [];

    fieldNames.forEach((fieldName) => {
      const errorMessages = getErrorMessages(fieldName);
      errorMessages.forEach((errorMessage) => {
        if (!uniqueErrorMessages.includes(errorMessage)) {
          uniqueErrorMessages.push(errorMessage);
        }
      });
    });

    return uniqueErrorMessages;
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email or username
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com/username"
                ref={usernameOrEmailRef}
              />
              {errors &&
                getUniqueErrorMessages(['username', 'email']).map(
                  (errorMessage, index) => (
                    <p key={index} className="text-red-500 text-sm mt-1">
                      {errorMessage}
                    </p>
                  ),
                )}
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
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ref={passwordRef}
              />
              {errors &&
                getErrorMessages('password').map((errorMessage, index) => (
                  <p key={index} className="text-red-500 text-sm mt-1">
                    {errorMessage}
                  </p>
                ))}
            </div>
            <button
              onClick={handleLoginClick}
              className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{' '}
              <NavLink
                to="/registration"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
