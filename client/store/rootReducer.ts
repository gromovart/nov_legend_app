import { combineReducers } from 'redux';
import authDataReducer from './AuthData/reducer';
import mapDataReducer from './MapData/reducer';

const rootReducer = combineReducers({
  authData: authDataReducer,
  mapData: mapDataReducer,
});
export default rootReducer;
