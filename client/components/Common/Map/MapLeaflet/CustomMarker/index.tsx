import React from 'react';
import { Marker } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import MarkerPopup from '../MarkerPopup';
import MarkerIcon from './MarkerIcon';
import { setCurrentMarkerAction } from '../../../../../store/MapData/actions';

const VenueMarkers: React.FC<any> = ({ marker, currentMarker }) => {
  const dispatch = useDispatch();
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
    e.target.openPopup();
    dispatch(setCurrentMarkerAction(marker));
  };

  return (
    <>
      <Marker
        position={coordinate}
        // riseOnHover
        interactive
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
