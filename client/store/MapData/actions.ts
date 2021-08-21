import axios from 'axios';
import { TMarkersData } from './types';

export enum MapDataActionsTypes {
  getMarkersAction = 'getMarkers',
  setCurrentMarkerAction = 'setCurrentMarker',
}

export const getMarkersAction = (params: TMarkersData) => {
  return async (dispatch: any) => {
    try {
      const { data } = await axios.get(`http://localhost:8888/api/map-marker`, {
        params,
      });
      dispatch({ type: MapDataActionsTypes.getMarkersAction, payload: data });
    } catch (e) {
      console.log(e);
    }
  };
};

export const setCurrentMarkerAction = (params: any) => {
  return (dispatch: any) => {
    dispatch({
      type: MapDataActionsTypes.setCurrentMarkerAction,
      payload: params,
    });
  };
};
