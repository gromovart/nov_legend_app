import React from 'react';
import style from './style.module.scss';

const ActualMenuItem = () => {
  return (
    <div className={style.card__wrapper}>
      <div className={style.card__title}>Собор Софии Премудрости Божией</div>
      <div className={style.card__description}>1998 г.</div>
      <div className={style.card__description}>Популярность:</div>
      <div className={style.popular__line} />
    </div>
  );
};

export default ActualMenuItem;
