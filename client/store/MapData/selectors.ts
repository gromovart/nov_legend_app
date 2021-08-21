import { TStore } from '../rootTypes';

export const getMarkersData = (state: TStore) => {
  return state.mapData.markersData;
};

export const getCurrentMarkerData = (state: TStore) =>
  state.mapData.currentMarker;
