import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FC, useState } from 'react';

import Markers from './CustomMarker';

const MapDynamicView: FC<any> = ({
  markersData = [
    {
      id: 1,
      title: 'title',
      description: 'description',
      lat: 56.3287,
      long: 44.002,
    },
  ],
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
      zoom={10}
    >
      {/* <MyComponent /> */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/">Carto</a> contributors'
      />
      {markersData?.map((marker: any) => (
        <Markers key={marker.title} marker={marker} Popup={MarkerPopup} />
      ))}
    </MapContainer>
  );
};
export default MapDynamicView;
