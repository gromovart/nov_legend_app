import { MapDataActionsTypes } from './actions';
import { TMapData } from './types';

const initialState: TMapData = {
  markersData: [],
  currentMarker: null,
  currentBackgroundImg: '',
  isCreateNewRoute: false,
  selectedMarkers: null,
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
    case MapDataActionsTypes.setIsCreateRoute:
      return {
        ...state,
        isCreateNewRoute: action.payload,
      };
    case MapDataActionsTypes.setSelectedMarkersAction:
      return {
        ...state,
        selectedMarkers: action.payload,
      };
    case MapDataActionsTypes.setBackgroundImgAction:
      return {
        ...state,
        currentBackgroundImg: action.payload,
      };
    default:
      return state;
  }
};

export default mapDataReducer;
