import React from 'react';
import { Marker } from 'react-leaflet';
import MarkerPopup from '../MarkerPopup';
import MarkerIcon from './MarkerIcon';

const VenueMarkers: React.FC<any> = ({ marker, currentMarker }) => {
  const windowWidth = window.screen.width;
  const mouseOverHandler = (e: any) => {
    e.target.openPopup();
  };
  const mouseOutHandler = (e: any) => {
    e.target.closePopup();
  };
  const coordinate = {
    lat: marker.lat,
    lng: marker.long,
  };
  const clickHandler = (e: any) => {
    if (windowWidth > 1024) e.target.openPopup();
  };

  return (
    <>
      <Marker
        position={coordinate}
        riseOnHover
        bubblingMouseEvents={false}
        zIndexOffset={currentMarker === marker.id ? 50 : 0}
        icon={MarkerIcon}
        eventHandlers={{
          click: clickHandler,
          mouseout: mouseOutHandler,
          mouseover: mouseOverHandler,
        }}
      >
        <MarkerPopup data={marker} />
      </Marker>
    </>
  );
};
export default VenueMarkers;
