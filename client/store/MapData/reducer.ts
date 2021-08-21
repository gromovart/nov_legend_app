import { MapDataActionsTypes } from './actions';
import { TMapData } from './types';

const initialState: TMapData = {
  markersData: [],
  currentMarker: null,
};

const mapDataReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case MapDataActionsTypes.getMarkersAction:
      return {
        ...state,
        markersData: action.payload.data,
      };
    case MapDataActionsTypes.setCurrentMarkerAction:
      return {
        ...state,
        currentMarker: action.payload,
      };
    default:
      return state;
  }
};

export default mapDataReducer;
