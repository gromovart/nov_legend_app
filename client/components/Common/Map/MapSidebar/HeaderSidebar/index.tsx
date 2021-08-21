import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined';
import style from '../../style.module.scss';
import SearchInput from './SearchInput';
import {
  setCurrentMarkerAction,
  setIsCreateRouteAction,
  setSelectedMarkersAction,
  setShowCreateRouteAction,
} from '../../../../../store/MapData/actions';
import {
  getCurrentMarkerData,
  getSelectedMarkers,
  getShowCreateRoute,
} from '../../../../../store/MapData/selectors';

type THeaderSidebarProps = {
  goBack: () => void;
  onChangeSearch: (value: string) => void;
  clearSearch: () => void;
  value: string;
};

const HeaderSidebar: React.FC<THeaderSidebarProps> = ({
  goBack,
  onChangeSearch,
  clearSearch,
  // value,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const currentMarker = useSelector(getCurrentMarkerData);
  const selectedMarkers = useSelector(getSelectedMarkers);
  const showRoute = useSelector(getShowCreateRoute);
  // const count = useSelector(getMarkersCount);
  // const searchCount = useSelector(getSearchCount);
  const clickHandler = () => {
    if (currentMarker) {
      dispatch(setCurrentMarkerAction(null));
    } else {
      dispatch(setSelectedMarkersAction([]));
      dispatch(setIsCreateRouteAction(false));
      dispatch(setShowCreateRouteAction(false));
    }
  };

  return (
    // <div className={style['sidebar-header']}>
    //   <div className={style.header_title}>
    //     <h4>
    //       {`Достопримечательности `}
    //       <span>{1}</span>
    //     </h4>
    //     <button className={style.header_button} type="button">
    //       <svg className={`${style.icon} ${style['icon-attention']}`}>
    //         <use href="/sprite.svg#arrow-left" />
    //       </svg>
    //     </button>
    //   </div>
    //   <SearchInput
    //     title="Найти легенду"
    //     onChangeSearch={onChangeSearch}
    //     clearSearch={clearSearch}
    //     value={value}
    //   />
    // </div>
    <>
      <div className={style.sidebar__header}>
        <div
          className={style.header_title}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <h4>Достопримечательности</h4>
          {(currentMarker ||
            (showRoute &&
              (selectedMarkers || selectedMarkers?.length !== 0))) && (
            <button
              className={style.header_button}
              type="button"
              onClick={clickHandler}
            >
              <ArrowLeftOutlined />
            </button>
          )}
        </div>

        <SearchInput
          title="Найти легенду"
          onChangeSearch={onChangeSearch}
          clearSearch={clearSearch}
          value={value}
        />
      </div>
    </>
  );
};

export default HeaderSidebar;
