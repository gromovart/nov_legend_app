import React from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import ChooseBlock from './ChooseBlock';
import PageHeader from './PageHeader';
import Footer from '../Common/Footer';
import MapComponent from '../Common/Map';
import style from './style.module.scss';
import { getCurrentBackgroundImg } from '../../store/MapData/selectors';

const Header = dynamic(() => import('../Common/Header'), {
  ssr: false,
});

const MainPage = () => {
  const currentBackgroundImg = useSelector(getCurrentBackgroundImg);

  return (
    <>
      <div className="container">
        <Header />
      </div>
      <PageHeader />
      <div className="map__container_wrapper">
        <div className="opacity_container">
          <div className={style[`dynamic_bg_${currentBackgroundImg}_first`]} />
          <div className="container">
            <MapComponent />
          </div>
          <div className={style[`dynamic_bg_${currentBackgroundImg}_second`]} />
        </div>
      </div>
      <ChooseBlock />
      <Footer />
    </>
  );
};

export default MainPage;
