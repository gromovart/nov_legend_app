import { LogoutOutlined } from '@ant-design/icons';
import React from 'react';
import PopupRegistration from '../PopupRegistration';
import PopupAuthorization from '../PopupAutorization';
import style from './styled.module.scss';

const Header = () => {
  const [modalVisible, setModal2Visible] = React.useState(false);
  const [modalRegistrationVisible, setModalRegistrationVisible] =
    React.useState(false);
  const [userData, setUserData] = React.useState(
    JSON.parse(localStorage.getItem('userData'))
  );
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
        {!userData ? (
          <>
            <button
              type="button"
              className={style.item}
              onClick={() => {
                setModalRegistrationVisible(true);
              }}
            >
              Регистрация
            </button>

            <button
              className={style.btn__sign_up}
              type="button"
              onClick={() => {
                setModal2Visible(true);
              }}
            >
              ВОЙТИ
            </button>
          </>
        ) : (
          <div className={style.user__login}>
            <div className={style.user__name}>{`${
              userData?.lastName
            } ${userData?.firstName?.slice(0, 1)}.`}</div>
            <button
              type="button"
              onClick={() => {
                setUserData(null);
                localStorage.removeItem('userData');
              }}
              className={style.btn__logout}
            >
              <LogoutOutlined />
            </button>
          </div>
        )}
        <PopupAuthorization
          modalVisible={modalVisible}
          setModal2Visible={setModal2Visible}
          setUserData={setUserData}
        />
        <PopupRegistration
          modalVisible={modalRegistrationVisible}
          setModal2Visible={setModalRegistrationVisible}
          setUserData={setUserData}
        />
      </div>
    </div>
  );
};

export default Header;
