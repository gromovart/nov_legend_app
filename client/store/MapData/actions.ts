import axios from 'axios';
import { TMarkersData } from './types';

export enum MapDataActionsTypes {
  getMarkersAction = 'getMarkers',
  setCurrentMarkerAction = 'setCurrentMarker',
  setIsCreateRoute = 'setIsCreateRoute',
  setSelectedMarkersAction = 'setSelectedMarkersAction',
  setBackgroundImgAction = 'setBackgroundImg',
  setShowCreateRouteAction = 'setShowCreateRouteAction',
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

export const setBackgroundImgAction = (params: any) => {
  return (dispatch: any) => {
    dispatch({
      type: MapDataActionsTypes.setBackgroundImgAction,
      payload: params,
    });
  };
};

export const setIsCreateRouteAction = (params: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: MapDataActionsTypes.setIsCreateRoute,
      payload: params,
    });
  };
};

export const setSelectedMarkersAction = (params: any) => {
  return (dispatch: any) => {
    dispatch({
      type: MapDataActionsTypes.setSelectedMarkersAction,
      payload: params,
    });
  };
};

export const setShowCreateRouteAction = (params: any) => {
  return (dispatch: any) => {
    dispatch({
      type: MapDataActionsTypes.setShowCreateRouteAction,
      payload: params,
    });
  };
};
