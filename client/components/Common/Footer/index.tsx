import React from 'react';
import { Divider } from 'antd';
import Image from 'next/image';
import style from './styled.module.scss';

const Footer = () => {
  return (
    <footer className={style.footer__wrapper}>
      <div className={style.footer__layout}>
        <div className="container">
          <div className={style.footer__header}>
            <div className={style.footer__logo}>
              <span className={style.logo_title}>NOV</span>.Legend
            </div>
            <Divider type="vertical" className={style.footer__header__driver} />
            <div className={style.footer__description}>
              Первая в России карта фольклера и народных сказаний Новогородской
              области
            </div>
            <div className={style.footer__nov_logo}>
              <Image
                src="/nov_logo.png"
                alt="medved"
                width="80"
                height="80"
                quality={80}
                objectFit="contain"
              />
            </div>
          </div>
          <Divider className={style.footer__driver} />
          <div className={style.footer__footer}>
            <div className={style.footer__footer_link}>
              <a
                href="tel:8930123412"
                target="_blank"
                rel="noopener noreferrer"
              >
                8930123412
              </a>
            </div>
            <div className={style.footer__footer_link}>
              <a
                href="mailto:support@nov.legend.ru"
                target="_blank"
                rel="noopener noreferrer"
              >
                support.nov.legend.ru
              </a>
            </div>
            <ul className={style.footer__footer_list}>
              <li className={style.footer__footer_list_item}>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <img src="/fb.svg" alt="fb_icon" />
                </a>
              </li>
              <li className={style.footer__footer_list_item}>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <img src="/tw.svg" alt="tw_icon" />
                </a>
              </li>
              <li className={style.footer__footer_list_item}>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <img src="/inst.svg" alt="inst_icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
