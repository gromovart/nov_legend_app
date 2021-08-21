import { SoundOutlined } from '@ant-design/icons/lib/icons';
import React from 'react';
import style from './style.module.scss';

const ActualMenuItem = ({ title, year, percent }) => {
  return (
    <div className={style.card__wrapper}>
      <div className={style.card__title}>{title}</div>
      <div className={style.card__description}>{year}</div>
      <div className={style.card__description}>Популярность:</div>
      <div className={style.popular__line}>
        <div className={style.line__orange} style={{ width: percent }} />
      </div>
      <button
        type="button"
        className={style.btn__audio}
        onClick={() => {
          const audio = new Audio('/gusli.mp3');
          audio.play();
        }}
      >
        <SoundOutlined />
      </button>
    </div>
  );
};

export default ActualMenuItem;
