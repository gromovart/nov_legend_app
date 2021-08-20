import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import style from './style.module.scss';
import Icon from './Icon';

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
  return (
    <div className={style.map_window}>
      <div className={`${style.map_container} ${style['marker-info']} `}>
        <NoSSRMapComponent />
      </div>
      <NoSSRSidebar />
    </div>
  );
};
export default MapComponent;
