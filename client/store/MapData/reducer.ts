import { MapDataActionsTypes } from './actions';
import { TMapData } from './types';

const initialState: TMapData = {
  markersData: [],
  filtredData: null,
  currentMarker: null,
  currentBackgroundImg: '',
  isCreateNewRoute: false,
  selectedMarkers: null,
  showCreateRoute: false,
};
const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
const mapDataReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case MapDataActionsTypes.getMarkersAction:
      return {
        ...state,
        markersData: action.payload.data.map((item) => ({
          ...item,
          percent: getRandom(10, 100),
          year: getRandom(935, 1900),
        })),
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
    case MapDataActionsTypes.setShowCreateRouteAction:
      return {
        ...state,
        showCreateRoute: action.payload,
      };
    case MapDataActionsTypes.setFiltredDataAction:
      return {
        ...state,
        filtredData: action.payload,
      };
    default:
      return state;
  }
};

export default mapDataReducer;
