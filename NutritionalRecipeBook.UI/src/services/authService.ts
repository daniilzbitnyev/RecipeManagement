import { LoginModel } from 'models/LoginModel';
import { RegisterModel } from 'models/RegisterModel';

const BASE = `${process.env.REACT_APP_API_URL}/api/auth`;

export interface ErrorResponse {
  message: string;
  errors: string[];
}

export const signUp = async (
  user: RegisterModel,
): Promise<string[] | string> => {
  const response = await fetch(`${BASE}/sign-up`, {
    method: 'POST',
    body: JSON.stringify({
      userName: user.username,
      email: user.email,
      password: user.password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const data: ErrorResponse = await response.json();

    if (data.errors) {
      const errorMessages = Object.values(data.errors).flat();
      return errorMessages;
    }
  }

  const data = await response.json();
  return data.message;
};

export interface LoginResponse {
  id: string;
  token: string;
}

export const signIn = async (
  login: LoginModel,
): Promise<string[] | LoginResponse | string> => {
  const response = await fetch(`${BASE}/sign-in`, {
    method: 'POST',
    body: JSON.stringify({
      userNameOrEmail: login.userNameOrEmail,
      password: login.password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status == 401) {
      const data: ErrorResponse = await response.json();
      if (data.message == 'Please verify your email.') {
        return data.message;
      }
      return 'Invalid Credentials';
    }

    const data: ErrorResponse = await response.json();

    if (data.errors) {
      const errorMessages = Object.values(data.errors).flat();
      return errorMessages;
    }
  }

  const data = await response.json();
  return data;
};
