import React from 'react';
import style from '../style.module.scss';
import HeaderSidebar from './HeaderSidebar';
import SidebarMenu from './SidebarMenu';
import ActualMenuItem from './SidebarMenu/CategoriesMenu/ActualMenuItem';

type TProps = {
  goBack: () => void;
  markerData: any;
  searchValue: string;
  sidebarClickHandler: (category: any, data: any) => () => void;
  onChangeSearch: (valu: string) => void;
  clearSearch: () => void;
  value: string;
  seeMoreHandler: (offset: number) => void;
};

const MapSidebar: React.FC<TProps & any> = ({
  goBack,
  sidebarClickHandler,
  searchValue,
  markerData,
  onChangeSearch,
  clearSearch,
  value,
  seeMoreHandler,
}) => {
  return (
    <div className={style.sidebar}>
      <HeaderSidebar
        goBack={goBack}
        clearSearch={clearSearch}
        onChangeSearch={onChangeSearch}
        value={value}
      />
      <ActualMenuItem
        title="Собор Софии Премудрости Божией"
        percent="75%"
        year="1998 г."
      />
      <SidebarMenu
        sidebarClickHandler={sidebarClickHandler}
        searchValue={searchValue}
        markerData={markerData}
        seeMoreHandler={seeMoreHandler}
      />
    </div>
  );
};

export default MapSidebar;
