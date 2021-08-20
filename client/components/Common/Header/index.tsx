import React from 'react';
import style from './styled.module.scss';

const Header = () => {
  return (
    <div className={`container ${style.header__wrapper}`}>
      <div className={style.header__logo}>
        <span className={style.logo_title}>NOV</span>.Legend
      </div>
      <div className={style.header__menu_items}>
        <a href="/" className={style.item}>
          Карта фольклора
        </a>
        <a href="/" className={style.item}>
          Галерея
        </a>
        <a href="/" className={style.item}>
          О нас
        </a>
        <a href="/" className={style.item}>
          Регистрация
        </a>
        <button className={style.btn__sign_up} type="button">
          Войти
        </button>
      </div>
    </div>
  );
};

export default Header;
