import { MapDataActionsTypes } from './actions';
import { TMapData } from './types';

const initialState: TMapData = {
  markersData: [],
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

    default:
      return state;
  }
};

export default mapDataReducer;
