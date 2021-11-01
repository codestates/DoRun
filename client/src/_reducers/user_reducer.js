import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  KAKAO_USER,
  GOOGLE_USER,
  LOGOUT_USER,
} from '../_actions/types';

export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginUser: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
    case GOOGLE_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    case KAKAO_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    case LOGOUT_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    default:
      return state;
  }
}
