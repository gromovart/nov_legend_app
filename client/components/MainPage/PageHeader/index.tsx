import React from 'react';
import style from './styled.module.scss';

const PageHeader = () => {
  return (
    <div className={`${style.page__header_wrapper}`}>
      <div className={`${style.container} ${style.content__header}`}>
        <div className={style.}>Journeys of Inspiration</div>
      </div>
    </div>
  );
};

export default PageHeader;
