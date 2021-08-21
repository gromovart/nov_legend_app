import React from 'react';
import dynamic from 'next/dynamic';
import ChooseBlock from './ChooseBlock';
import PageHeader from './PageHeader';
import Footer from '../Common/Footer';
import MapComponent from '../Common/Map';

const Header = dynamic(() => import('../Common/Header'), {
  ssr: false,
});
// import style from './styled.module.scss';

const MainPage = () => {
  return (
    <>
      <div className="container">
        <Header />
      </div>
      <PageHeader />
      <ChooseBlock />
      <div className="map__container_wrapper">
        <div className="opacity_container">
          <div className="container">
            <MapComponent />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
