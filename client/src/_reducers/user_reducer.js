import {
  LOGIN_USER,
  REGISTER_USER,
  KAKAO_USER,
  GOOGLE_USER,
  CHECK_USERLOG,
  LOGOUT_USER,
  SIGNOUT_USER,
  GUEST_USER,
  GUEST_LOGOUT,
  CREATE_CREW,
  JOIN_CREW,
  WITHDRAWAL_CREW,
} from '../_actions/types';

export default function user(
  state = {
    userId: null,
    email: null,
    nickname: null,
    image: null,
    userCrewId: null,
    isauth: null,
    accessToken: null,
  },
  action
) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        userId: action.payload.data.id,
        email: action.payload.data.email,
        nickname: action.payload.data.nickname,
        image: action.payload.data.image,
        userCrewId: action.payload.data.crewId,
        isauth: action.payload.data.isauth,
        accessToken: action.payload.accessToken,
      };
      break;

    case REGISTER_USER:
      return { ...state };
      break;

    case GOOGLE_USER:
      return {
        ...state,
        userId: action.payload.data.id,
        email: action.payload.data.email,
        nickname: action.payload.data.nickname,
        image: action.payload.data.image,
        userCrewId: action.payload.data.crewId,
        isauth: action.payload.data.isauth,
        accessToken: action.payload.accessToken,
      };
      break;

    case KAKAO_USER:
      return {
        ...state,
        userId: action.payload.data.id,
        email: action.payload.data.email,
        nickname: action.payload.data.nickname,
        image: action.payload.data.image,
        userCrewId: action.payload.data.crewId,
        isauth: action.payload.data.isauth,
        accessToken: action.payload.accessToken,
      };
      break;

    case CHECK_USERLOG:
      return {
        ...state,
        userId: action.payload.id,
        email: action.payload.email,
        nickname: action.payload.nickname,
        image: action.payload.image,
        userCrewId: action.payload.crewId,
        isauth: action.payload.isauth,
        accessToken: action.payload.accessToken,
        log: action.payload.log,
      }

    case LOGOUT_USER:
      return {
        userId: null,
        email: null,
        nickname: null,
        image: null,
        userCrewId: null,
        isauth: null,
        accessToken: null,
      };
      break;

    case SIGNOUT_USER:
      return {
        userId: null,
        email: null,
        nickname: null,
        image: null,
        userCrewId: null,
        isauth: null,
        accessToken: null,
      };
      break;

    case GUEST_USER:
      return {
        userId: action.payload.data.id,
        email: action.payload.data.email,
        nickname: action.payload.data.nickname,
        image: action.payload.data.image,
        userCrewId: null,
        isauth: action.payload.data.isauth,
        accessToken: null,
      };
      break;

    case GUEST_LOGOUT:
      return {
        userId: null,
        email: null,
        nickname: null,
        image: null,
        userCrewId: null,
        isauth: null,
        accessToken: null,
      }

    case CREATE_CREW:
      return {
        ...state,
        userCrewId: action.payload.data.data.crewId,
      };
      break;

    case JOIN_CREW:
      return {
        ...state,
        userCrewId: action.payload.data.data.crewId,
      };
      break;

    case WITHDRAWAL_CREW:
      return {
        ...state,
        userCrewId: null,
      };
      break;

    default:
      return state;
  }
}
