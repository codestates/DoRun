import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  KAKAO_USER,
  GOOGLE_USER,
} from './types';

export function loginUser(dataToSubmit) {
  const request = axios
    .post('http://localhost:3001/user/login', dataToSubmit)
    .then((response) => response.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post('http://localhost:3001/user/signup', dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get('http://localhost:3001/user')
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function googleUser(dataToSubmit) {
  const { email, imageUrl, name, isauth } = dataToSubmit;
  const request = axios
    .post(
      'http://localhost:3001/oauth/google',
      { email, imageUrl, name, isauth },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((res) => res.data.data);

  return {
    type: GOOGLE_USER,
    payload: request,
  };
}

export function kakaoUser(dataToSubmit) {
  const request = axios
    .post('http://localhost:3001/oauth/kakao', {
      authorizationCode: dataToSubmit,
    })
    .then((response) => response.data.data);

  return {
    type: KAKAO_USER,
    payload: request,
  };
}
