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
