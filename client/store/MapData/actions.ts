import axios from 'axios';
import { TMarkersData } from './types';

export enum MapDataActionsTypes {
  getMarkersAction = 'getMarkers',
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
