import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.scss';
import Icon from './Icon';
import { getMarkersData } from '../../../store/MapData/selectors';
import { getMarkersAction } from '../../../store/MapData/actions';

type TProps = {
  goBack: () => void;
  companyData: any;
  searchValue: string;
  sidebarClickHandler: (category: any, data: any) => () => void;
  CompanyInfoComponent: FC<any>;
  categoriesList: any;
  onChangeSearch: (value: string) => void;
  clearSearch: () => void;
  value: string;
  MarkerPopup: FC<any>;
  seeMoreHandler: (offset: number) => void;
};

const NoSSRMapComponent = dynamic(() => import('./MapLeaflet'), {
  ssr: false,
});
const NoSSRSidebar = dynamic(() => import('./MapSidebar'), {
  ssr: false,
});

const MapComponent: React.FC<TProps & any> = () => {
  const dispatch = useDispatch();
  const markersData = useSelector(getMarkersData);
  useEffect(() => {
    dispatch(getMarkersAction({}));
  }, []);
  return (
    <div className={style.map_window}>
      <div className={`${style.map_container} ${style['marker-info']} `}>
        <NoSSRMapComponent markersData={markersData} />
      </div>
      <NoSSRSidebar markersData={markersData} />
    </div>
  );
};
export default MapComponent;
