import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FC, useState } from 'react';

import Markers from './VenueMarkers';

const MapDynamicView: FC<any> = ({
  markersData,
  initData,
  onMapClickHandler,
  moveMapHandler,
  MarkerPopup,
}) => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const windowWidth = window.screen.width;
  const MyComponent = () => {
    useMapEvent('click', () => {});
    useMapEvent('moveend', () => {
      moveMapHandler;
    });
    return null;
  };

  return (
    <MapContainer
      style={{ width: '100%', height: '100%', zIndex: 0 }}
      center={{ lat: 56.3287, lng: 44.002 }}
      whenCreated={setMap}
      // zoomControl={windowWidth > 750}
      zoom={10}
      // minZoom={4}
    >
      {/* <MyComponent /> */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};
export default MapDynamicView;
