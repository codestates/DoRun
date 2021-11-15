import {
  LOGIN_USER,
  REGISTER_USER,
  KAKAO_USER,
  GOOGLE_USER,
  LOGOUT_USER,
  SIGNOUT_USER,
  CREATE_CREW,
  JOIN_CREW,
  WITHDRAWAL_CREW,
} from '../_actions/types';

export default function user(
  state = {
    userId: null,
    nickname: null,
    image: null,
    userCrewId: null,
    accessToken: null,
  },
  action
) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        userId: action.payload.data.id,
        nickname: action.payload.data.nickname,
        image: action.payload.data.image,
        userCrewId: action.payload.data.crewId,
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
        nickname: action.payload.data.nickname,
        image: action.payload.data.image,
        userCrewId: action.payload.data.crewId,
        accessToken: action.payload.accessToken,
      };
      break;
    case KAKAO_USER:
      console.log('action type', action.type)
      return {
        ...state,
        // userId: action.payload.data.id,
        // nickname: action.payload.data.nickname,
        // image: action.payload.data.image,
        // userCrewId: action.payload.data.crewId,
        // accessToken: action.payload.accessToken,
      };
      break;
    case LOGOUT_USER:
      return {
        userId: null,
        nickname: null,
        image: null,
        userCrewId: null,
        accessToken: null,
      };
      break;
    case SIGNOUT_USER:
      return {
        userId: null,
        nickname: null,
        image: null,
        userCrewId: null,
        accessToken: null,
      };
      break;

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
