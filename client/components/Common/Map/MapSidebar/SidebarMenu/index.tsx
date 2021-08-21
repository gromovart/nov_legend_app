import { useEffect, useRef } from 'react';
import style from '../../style.module.scss';

import ScrollWrapper from '../../../ScrollWrapper';

const getHeight = () => {
  if (window && window.screen.width < 750) {
    return '100vh';
  }
  if (window && window.screen.width < 1024) {
    return 330;
  }
  return 495;
};

let scroll = 0;

const SidebarMenu = ({
  markersData,
  sidebarClickHandler,
  data,
  searchValue,
  categoriesList,
  seeMoreHandler,
}: any) => {
  const scrollRef: any = useRef();

  const scrollHandler = () => {
    if (!data) {
      scroll = scrollRef?.current?.viewScrollTop;
    }
  };
  const dataList = [];
  for (let i = 0; i < 100; i += 1) {
    dataList[i] = { name: `name${i}`, description: `description${i}` };
  }
  return (
    <div
      className={`${style['sidebar-menu_wrapper']} ${data ? style.hide : ''}`}
    >
      <ScrollWrapper
        scrollRef={scrollRef}
        maxHeight={getHeight()}
        scrollHandler={scrollHandler}
      >
        <div
          className={`${
            searchValue ? style['sidebar-menu'] : style['sidebar-category-menu']
          } ${searchValue ? style.result : ''}`}
        />
      </ScrollWrapper>
    </div>
  );
};
export default SidebarMenu;
