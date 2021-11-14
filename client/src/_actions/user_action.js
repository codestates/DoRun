import {
  LOGIN_USER,
  REGISTER_USER,
  KAKAO_USER,
  GOOGLE_USER,
  LOGOUT_USER,
  SIGNOUT_USER,
} from './types';
import axios from 'axios';
axios.defaults.withCredentials = true;

function loginUser(dataToSubmit) {
  const request = axios
    .post(`${process.env.REACT_APP_SERVER}/user/login`, dataToSubmit)
    .then((response) => {
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
    .post(`${process.env.REACT_APP_SERVER}/user/signup`, dataToSubmit)
    .then((response) => {
      return response.data;
    });
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

async function googleUser(dataToSubmit) {
  const { email, imageUrl, name } = dataToSubmit;

  const request = await axios
    .post(`${process.env.REACT_APP_SERVER}/oauth/google`, {
      email,
      imageUrl,
      name,
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.log(e));
  return {
    type: GOOGLE_USER,
    payload: request,
  };
}

async function kakaoUser(dataToSubmit) {

  console.log('인가코드', dataToSubmit);

  const request = await axios
    .post(`${process.env.REACT_APP_SERVER}/oauth/kakao`, {
      authorizationCode: dataToSubmit,
    })
    .then((response) => {
      console.log('인가를 받아온 응답입니다', response)
      // sessionStorage.setItem('accessToken', response.data.accessToken);
      // sessionStorage.setItem('userId', response.data.data.id);
      // sessionStorage.setItem('userCrewId', response.data.data.crewId);
      // sessionStorage.setItem('userNickname', response.data.data.nickname);
      return response.data.data;
    })
    .catch((e) => console.log(e));

  return {
    type: KAKAO_USER,
    payload: request,
  };
}

async function logoutUser(dataToSubmit) {
  const request = await axios
    .post(`${process.env.REACT_APP_SERVER}/user/logout`, dataToSubmit)
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.log(e));

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

async function signoutUser(dataToSubmit) {
  const request = await axios
    .delete(`${process.env.REACT_APP_SERVER}/user/signout`, dataToSubmit)
    .then((response) => {
      console.log(response);
    })
    .catch((e) => console.log(e));

  return {
    type: SIGNOUT_USER,
    payload: request,
  };
}

export {
  loginUser,
  registerUser,
  googleUser,
  kakaoUser,
  logoutUser,
  signoutUser,
};
