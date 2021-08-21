export type TMarkersData = {
  lat1?: number;
  lat2?: number;
  long1?: number;
  long2?: number;
  zoomLevel?: number;
  mapCategoryId: number;
};

export type TMapData = {
  markersData: any[];
  currentMarker: any;
  isCreateNewRoute: boolean;
  selectedMarkers: any[];
};
