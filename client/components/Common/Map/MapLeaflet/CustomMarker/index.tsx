import React from 'react';
import { Marker } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import MarkerPopup from '../MarkerPopup';
import { getIcon } from './MarkerIcon';
import {
  setBackgroundImgAction,
  setCurrentMarkerAction,
} from '../../../../../store/MapData/actions';
import { getIsCreateNewRoute } from '../../../../../store/MapData/selectors';

const VenueMarkers: React.FC<any> = ({
  marker,
  currentMarker,
  createNewRouteHandler,
}) => {
  const dispatch = useDispatch();
  const isCreatingNewRoute = useSelector(getIsCreateNewRoute);
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

  const getBg: (
    type:
      | 'Легенды'
      | 'Предания'
      | 'Сказки'
      | 'Былички'
      | 'Озёра'
      | 'Источники'
      | 'Камни'
      | 'Другое'
  ) => any = (type) => {
    let currentPath = '';
    if (type === 'Легенды') currentPath = 'veto';
    if (type === 'Предания') currentPath = 'med';
    if (type === 'Сказки') currentPath = 'crocodil';
    if (type === 'Былички') currentPath = 'med';
    if (type === 'Озёра') currentPath = 'fish';
    if (type === 'Источники') currentPath = 'fish';
    if (type === 'Камни') currentPath = 'beresta';
    if (type === 'Другое') currentPath = 'crocodil';

    return currentPath;
  };
  const clickHandler = (e: any) => {
    if (isCreatingNewRoute) {
      createNewRouteHandler(marker);
      dispatch(
        setBackgroundImgAction(getBg(marker?.mapCategories?.[0]?.title))
      );
    } else {
      e.target.openPopup();
      dispatch(setCurrentMarkerAction(marker));
      dispatch(
        setBackgroundImgAction(getBg(marker?.mapCategories?.[0]?.title))
      );
    }
  };

  return (
    <>
      <Marker
        position={coordinate}
        // riseOnHover
        interactive
        bubblingMouseEvents={false}
        zIndexOffset={currentMarker === marker.id ? 50 : 0}
        icon={getIcon(marker?.mapCategories?.[0]?.title)?.icon}
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
