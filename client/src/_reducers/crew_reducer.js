import { CREATE_CREW, JOIN_CREW, WITHDRAWAL_CREW } from '../_actions/types';

export default function crew(state = {}, action) {
  switch (action.type) {
    case CREATE_CREW:
      return { createCrew: action.payload };
      break;

    case JOIN_CREW:
      return { joinCrew: action.payload };
      break;

    case WITHDRAWAL_CREW:
      return { withdrawalCrew: action.payload };
      break;
    default:
      return state;
  }
}
