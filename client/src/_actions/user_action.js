import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER, KAKAO_USER, GOOGLE_USER } from './types';

export function loginUser(dataToSubmit) {
  const request = axios
    .post('/users/login', dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post('/users/register', dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get('/users/auth')
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export async function googleUser(dataToSubmit) {

  const { email, imageUrl, name, isauth } = dataToSubmit;
  const request = await axios.post('http://localhost:3001/oauth/google', 
  { email, imageUrl, name, isauth }, 
  { headers: { 'Content-Type': 'application/json' } })
  .then((res) => {console.log('구글 로그인 자료입니다.', res.data.data), res.data.data});

  return {
    type: GOOGLE_USER,
    payload: request,
  }
}

export async function kakaoUser(dataToSubmit) {
  const request = await axios.post('http://localhost:3001/oauth/kakao', { authorizationCode : dataToSubmit })
  .then((response) => {console.log('제말이 들리시나요ㅠㅠ', response.data.data), response.data.data})

  return {
    type: KAKAO_USER,
    payload: request
  }
}


