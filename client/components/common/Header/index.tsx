import React from 'react';
import style from './styled.module.scss';

const Header = () => {
  return (
    <div className={`container ${style.header__wrapper}`}>
      <div className={style.header__logo}>Travelix Pro</div>
      <div className={style.header__menu_items}>
        <a href="/" className={style.item}>
          Tours
        </a>
        <a href="/" className={style.item}>
          Services
        </a>
        <a href="/" className={style.item}>
          Package
        </a>
        <a href="/" className={style.item}>
          About Us
        </a>
        <a href="/" className={style.item}>
          Sign In
        </a>
        <button className={style.btn__sign_up} type="button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Header;
