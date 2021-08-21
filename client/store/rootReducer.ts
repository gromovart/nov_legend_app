import { combineReducers } from 'redux';
import mapDataReducer from './MapData/reducer';

const rootReducer = combineReducers({
  mapData: mapDataReducer,
});
export default rootReducer;
