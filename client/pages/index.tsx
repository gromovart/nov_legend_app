import React from 'react';
import MapComponent from '../components/Common/Map';
import MainPage from '../components/MainPage';

const IndexPage = () => (
  <>
    <MainPage />
    <div className="container">
      <MapComponent />
    </div>
  </>
);

export default IndexPage;
