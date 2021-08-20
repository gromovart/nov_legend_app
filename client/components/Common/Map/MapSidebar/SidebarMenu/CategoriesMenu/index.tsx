import { useEffect } from 'react';
import MenuItem from './MenuItem';

const CategoriesMenu = ({
  sidebarClickHandler,
  categoriesList,
  scrollRef,
}: any) => {
  useEffect(() => {
    scrollRef?.current?.scrollTop(0);
  });
  return (
    <>
      {categoriesList.map((item: any) => (
        <MenuItem
          key={item.id}
          title={item.title}
          id={item.id}
          clickHandler={sidebarClickHandler}
        />
      ))}
    </>
  );
};
export default CategoriesMenu;
