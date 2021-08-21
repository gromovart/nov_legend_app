import React from 'react';
import { useSelector } from 'react-redux';
import style from '../style.module.scss';
import HeaderSidebar from './HeaderSidebar';
import ActualMenuItem from './SidebarMenu/CategoriesMenu/ActualMenuItem';
import ScrollWrapper from '../../ScrollWrapper';
import {
  getCurrentMarkerData,
  getSelectedMarkers,
} from '../../../../store/MapData/selectors';
import FullInfoMarker from './SidebarMenu/FullInfoMarker';

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
  markersData,
  onChangeSearch,
  clearSearch,
  value,
}) => {
  const selectedMarker = useSelector(getCurrentMarkerData);
  const selectedMarkers = useSelector(getSelectedMarkers);

  return (
    <div className={style.sidebar}>
      <HeaderSidebar
        goBack={goBack}
        clearSearch={clearSearch}
        onChangeSearch={onChangeSearch}
        value={value}
      />
      <ScrollWrapper maxHeight={800}>
        {selectedMarker && (
          <FullInfoMarker
            {...selectedMarker}
            percent={`${getRandom(10, 100)}%`}
          />
        )}
        {selectedMarkers &&
          selectedMarkers.map((item) => (
            <ActualMenuItem
              title={item.name}
              audio={item.audio}
              percent={`${getRandom(10, 100)}%`}
              year={`${getRandom(935, 1800)} г.`}
              data={item}
            />
          ))}
        {!selectedMarker &&
          !selectedMarkers &&
          markersData.map((item) => (
            <ActualMenuItem
              title={item.name}
              audio={item.audio}
              percent={`${getRandom(10, 100)}%`}
              year={`${getRandom(935, 1800)} г.`}
              data={item}
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
