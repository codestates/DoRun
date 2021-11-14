import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session';

import user from './user_reducer';
import crew from './crew_reducer';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const rootReducer = combineReducers({
  user,
  crew,
});

export default persistReducer(persistConfig, rootReducer);
