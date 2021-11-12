import { CREATE_CREW } from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_CREW:
      return { ...state, createCrew: action.payload };
      break;
    default:
      return state;
  }
}
