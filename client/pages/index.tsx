import React from 'react';
import MapComponent from '../components/Common/Map';
import MainPage from '../components/MainPage';

const IndexPage = () => (
  <>
    <MainPage />
    <div className="map__container_wrapper">
      <div className="opacity_container">
        <div className="container">
          <MapComponent />
        </div>
      </div>
    </div>
    <div style={{ height: 300 }}>footer</div>
  </>
);

export default IndexPage;
