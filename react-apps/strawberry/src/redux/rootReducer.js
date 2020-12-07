import { combineReducers } from 'redux';
import authenticationReducer from './ducks/authentication';

const rootReducer = combineReducers({
  authenticationReducer,
});

export default rootReducer;
