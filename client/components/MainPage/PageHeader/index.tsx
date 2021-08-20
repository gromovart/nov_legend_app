import React from 'react';
import style from './styled.module.scss';

const PageHeader = () => {
  return (
    <div className={`${style.page__header_wrapper}`}>
      <div className={`${style.container} ${style.content__header}`}>
        <div className={style.description__title}>Journeys of Inspiration</div>
        <div className={style.page__header_title}>
          Start Your Journey <br /> for Enjoy Life.
        </div>
        <div className={style.header__description}>
          Travel Agency Threats and Opportunities. The Perspective of <br />
          Successful Owners
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
