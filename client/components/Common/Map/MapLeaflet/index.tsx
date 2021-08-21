import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

import Markers from './CustomMarker';

const MapDynamicView = ({
  markersData,
  // onMapClickHandler,
  // moveMapHandler
}) => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const windowWidth = window.screen.width;
  const MyComponent = () => {
    useMapEvent('click', () => {});
    useMapEvent('moveend', () => {});
    return null;
  };

  return (
    <MapContainer
      style={{ width: '100%', height: '100%', zIndex: 0 }}
      center={{ lat: 58.55, lng: 31.33 }}
      whenCreated={setMap}
      zoom={12}
    >
      {/* <MyComponent /> */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/">Carto</a> contributors'
      />
      {markersData?.map((marker: any) => (
        <Markers key={marker.title} marker={marker} />
      ))}
    </MapContainer>
  );
};
export default MapDynamicView;
