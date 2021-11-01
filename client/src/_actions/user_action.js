import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  KAKAO_USER,
  GOOGLE_USER,
  LOGOUT_USER
} from './types';
import axios from 'axios';
axios.defaults.withCredentials = true;


//* 세션 스토리지 정보 저장을 위한 함수
function setUserInfo(dataName, data) {
  sessionStorage.setItem(dataName, data)
}


function loginUser(dataToSubmit) {
  const request = axios
    .post('http://localhost:3001/user/login', dataToSubmit)
    .then(response => {
      const { id } = response.data.data;
      const { accessToken } = response.data;
      setUserInfo('id', id);
      setUserInfo('accessToken', accessToken);
      return { id, accessToken };
    })
    .catch(e => console.log(e))
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
  const request = axios
    .get('/users/auth')
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

async function googleUser(dataToSubmit) {

  const { email, imageUrl, name } = dataToSubmit;

  const request = await axios.post('http://localhost:3001/oauth/google',
    { email, imageUrl, name })
    .then((response) => {
      const { id } = response.data.data;
      const { accessToken } = response.data;
      setUserInfo('id', id);
      setUserInfo('accessToken', accessToken);
      return { id, accessToken };
    })
    .catch(e => console.log(e));
  return {
    type: GOOGLE_USER,
    payload: request,
  };
}

async function kakaoUser(dataToSubmit) {
  const request = await axios.post('http://localhost:3001/oauth/kakao', { authorizationCode: dataToSubmit })
    .then((response) => {
      const { id } = response.data.data;
      const { accessToken } = response.data;
      setUserInfo('id', id);
      setUserInfo('accessToken', accessToken);
      return { id, accessToken };
    })
    .catch(e => console.log(e));

  return {
    type: KAKAO_USER,
    payload: request,
  };
}


async function logoutUser(dataToSubmit) {


  await axios.post('http://localhost:3001/user/logout', { userId: dataToSubmit })
    .then((response) => {
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('accessToken');

      return response.data.message;
    })
    .catch(e => console.log(e))



  return {
    type: LOGOUT_USER,
    payload: { id: '', accessToken: '' },
  };
}

export { loginUser, registerUser, googleUser, kakaoUser, logoutUser, auth }
