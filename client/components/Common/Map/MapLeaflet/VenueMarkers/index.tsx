import { Marker } from 'react-leaflet';

const VenueMarkers: React.FC<any> = ({ venue, currentMarker, Popup }) => {
  const windowWidth = window.screen.width;
  const mouseOverHandler = (e: any) => {
    e.target.openPopup();
  };
  const mouseOutHandler = (e: any) => {
    e.target.closePopup();
  };
  const coordinate = {
    lat: venue.lat,
    lng: venue.long,
  };
  // const clickHandler = (e: any) => {
  //   if (windowWidth > 1024) e.target.openPopup();
  //   dispatch(setCurrentMarker(e.target.options?.children?.props?.data?.id));
  //   dispatch(setCurrentData(e.target?.options?.children?.props?.data));
  // };

  return (
    <>
      <Marker
        position={coordinate}
        riseOnHover
        bubblingMouseEvents={false}
        zIndexOffset={currentMarker === venue.id ? 50 : 0}
        eventHandlers={{
          // click: clickHandler,
          mouseout: mouseOutHandler,
          mouseover: mouseOverHandler,
        }}
      >
        {/* <MarkerPopup data={venue} CustomPopup={Popup} /> */}
      </Marker>
    </>
  );
};
export default VenueMarkers;
