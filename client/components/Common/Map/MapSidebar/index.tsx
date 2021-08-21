import React from 'react';
import style from '../style.module.scss';
import HeaderSidebar from './HeaderSidebar';
import SidebarMenu from './SidebarMenu';
import ActualMenuItem from './SidebarMenu/CategoriesMenu/ActualMenuItem';
import ScrollWrapper from '../../ScrollWrapper';

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

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
const MapSidebar: React.FC<TProps & any> = ({
  goBack,
  sidebarClickHandler,
  searchValue,
  markersData,
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
      <ScrollWrapper maxHeight={800}>
        {markersData.map((item) => (
          <ActualMenuItem
            title={item.name}
            percent={`${getRandom(10, 100)}%`}
            year={`${getRandom(935, 1800)} г.`}
          />
        ))}
      </ScrollWrapper>

      {/* <ActualMenuItem */}
      {/*  title="Собор Софии Премудрости Божией" */}
      {/*  percent="75%" */}
      {/*  year="1998 г." */}
      {/* /> */}
      {/* <SidebarMenu */}
      {/*  sidebarClickHandler={sidebarClickHandler} */}
      {/*  searchValue={searchValue} */}
      {/*  markersData={markersData} */}
      {/*  seeMoreHandler={seeMoreHandler} */}
      {/* /> */}
    </div>
  );
};

export default MapSidebar;
