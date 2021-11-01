import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  KAKAO_USER,
  GOOGLE_USER,
  LOGOUT_USER,
} from './types';
import axios from 'axios';
axios.defaults.withCredentials = true;

function loginUser(dataToSubmit) {
  const request = axios
    .post('http://localhost:3001/user/login', dataToSubmit)
    .then((response) => {
      sessionStorage.setItem('accessToken', response.data.accessToken);
      sessionStorage.setItem('userId', response.data.data.id);
      sessionStorage.setItem('userCrewId', response.data.data.crewId);
      return response.data;
    })
    .catch((e) => console.log(e));
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

function registerUser(dataToSubmit) {
  const request = axios
    .post('http://localhost:3001/user/signup', dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

function auth() {
  const request = axios.get('/users/auth').then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

async function googleUser(dataToSubmit) {
  const { email, imageUrl, name } = dataToSubmit;

  const request = await axios
    .post('http://localhost:3001/oauth/google', { email, imageUrl, name })
    .then((response) => {
      sessionStorage.setItem('accessToken', response.data.accessToken);
      sessionStorage.setItem('userId', response.data.data.id);
      sessionStorage.setItem('userCrewId', response.data.data.crewId);
      return response.data;
    })
    .catch((e) => console.log(e));
  return {
    type: GOOGLE_USER,
    payload: request,
  };
}

async function kakaoUser(dataToSubmit) {
  const request = await axios
    .post('http://localhost:3001/oauth/kakao', {
      authorizationCode: dataToSubmit,
    })
    .then((response) => {
      sessionStorage.setItem('accessToken', response.data.accessToken);
      sessionStorage.setItem('userId', response.data.data.id);
      sessionStorage.setItem('userCrewId', response.data.data.crewId);
      return response.data;
    })
    .catch((e) => console.log(e));

  return {
    type: KAKAO_USER,
    payload: request,
  };
}

async function logoutUser(dataToSubmit) {
  const request = await axios
    .post('http://localhost:3001/user/logout', dataToSubmit)
    .then((response) => {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userCrewId');
      sessionStorage.removeItem('accessToken');

      return response.data;
    })
    .catch((e) => console.log(e));

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export { loginUser, registerUser, googleUser, kakaoUser, logoutUser, auth };
