import { TStore } from '../rootTypes';

export const getMarkersData = (state: TStore) => {
  return state.mapData.markersData;
};

export const getCurrentMarkerData = (state: TStore) =>
  state.mapData.currentMarker;

export const getIsCreateNewRoute = (state: TStore) =>
  state.mapData.isCreateNewRoute;

export const getSelectedMarkers = (state: TStore) =>
  state.mapData.selectedMarkers;

export const getCurrentBackgroundImg = (state: TStore) =>
  state.mapData.currentBackgroundImg;

export const getShowCreateRoute = (state: TStore) =>
  state.mapData.showCreateRoute;

export const getFiltredData = (state: TStore) => state.mapData.filtredData;
