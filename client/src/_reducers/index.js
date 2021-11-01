import { combineReducers } from 'redux';
import user from './user_reducer';
import crew from './crew_reducer';

const rootReducer = combineReducers({
  user,
  crew,
});

export default rootReducer;
