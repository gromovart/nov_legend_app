import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import 'leaflet-routing-machine';
import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Markers from './CustomMarker';
import {
  setIsCreateRouteAction,
  setSelectedMarkersAction,
} from '../../../../store/MapData/actions';
import { getIsCreateNewRoute } from '../../../../store/MapData/selectors';
import Icon from '../Icon';
// import RoutingMachine from '../RoutingMachines';
let distance;
let time;
const createRoutineMachineLayer = ({ selectedMarkers }) => {
  const instance = L.Routing.control({
    waypoints: selectedMarkers.map((item) => L.latLng(item.lat, item.long)),
    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    createMarker() {
      return null;
    },
  });
  instance.on('routesfound', function (e) {
    distance = e.routes[0].summary.totalDistance;
    time = e.routes[0].summary.totalTime;
  });
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

const MapDynamicView = ({
  markersData,
  // onMapClickHandler,
  // moveMapHandler
}) => {
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const createNewRouteHandler = (markerData: any) => {
    setSelectedMarkers((prev) => [...prev, markerData]);
  };
  const isCreatingNewRoute = useSelector(getIsCreateNewRoute);
  const createHandler = () => {
    dispatch(setIsCreateRouteAction(true));
  };
  const [createRoute, setCreateRoute] = useState(false);
  return (
    <>
      {isCreatingNewRoute && (
        <Tooltip title="Подтвердить маршрут" placement="right">
          <button
            style={{
              position: 'absolute',
              top: 85,
              left: 10,
              zIndex: 3,
              border: '2px solid #ccc',
              background: '#fff',
              width: 32,
              height: 32,
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            type="button"
            onClick={() => {
              setCreateRoute((prev) => !prev);
              dispatch(setIsCreateRouteAction(false));
              dispatch(setSelectedMarkersAction(selectedMarkers));
            }}
          >
            <CheckCircleOutlined style={{ transform: 'scale(1.3)' }} />
          </button>
        </Tooltip>
      )}
      {!isCreatingNewRoute && (
        <Tooltip title="Построить маршрут" placement="right">
          <button
            type="button"
            onClick={createHandler}
            style={{
              position: 'absolute',
              top: 85,
              left: 10,
              zIndex: 3,
              border: '2px solid #ccc',
              background: '#fff',
              width: 32,
              height: 32,
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Icon />
          </button>
        </Tooltip>
      )}
      <MapContainer
        style={{ width: '100%', height: '100%', zIndex: 0 }}
        center={{ lat: 58.5, lng: 31.6 }}
        whenCreated={setMap}
        zoom={9}
      >
        {/* <MyComponent /> */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/">Carto</a> contributors'
        />
        {markersData?.map((marker: any) => (
          <Markers
            key={marker.title}
            marker={marker}
            createNewRouteHandler={createNewRouteHandler}
          />
        ))}
        {createRoute && <RoutingMachine selectedMarkers={selectedMarkers} />}
      </MapContainer>
    </>
  );
};
export default MapDynamicView;
