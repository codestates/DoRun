import {
  LOGIN_USER,
  REGISTER_USER,
  KAKAO_USER,
  GOOGLE_USER,
  LOGOUT_USER,
  SIGNOUT_USER,
  GUEST_USER,
  GUEST_LOGOUT,
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
  // console.log('인가코드', dataToSubmit);
  const request = await axios
    .post(`${process.env.REACT_APP_SERVER}/oauth/kakao`, {
      authorizationCode: dataToSubmit,
    })
    .then((response) => {
      // console.log('인가를 받아온 응답입니다', response)
      return response.data;
    })
    .catch((e) => console.log(e));

  console.log('request', request);
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

async function signoutUser(userId) {
  const request = await axios
    .delete(`${process.env.REACT_APP_SERVER}/user/signout/${userId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((e) => console.log(e));

  return {
    type: SIGNOUT_USER,
    payload: request,
  };
}


async function guestUser() {
  const request = await axios
    .post(`${process.env.REACT_APP_SERVER}/user/guest_login`)
    .then((response) => {
      // console.log('게스트 로그인', response)
      return response.data;
    })
    .catch((e) => console.log(e));


  return {
    type: GUEST_USER,
    payload: request,
  };
}

function guestLogoutUser() {
  const request = {
    userId: null,
    email: null,
    nickname: null,
    image: null,
    userCrewId: null,
    isauth: null,
    accessToken: null,
  }
  return {
    type: GUEST_LOGOUT,
    payload: request
  }
}

export {
  loginUser,
  registerUser,
  googleUser,
  kakaoUser,
  logoutUser,
  signoutUser,
  guestUser,
  guestLogoutUser
};
