import React, { useEffect } from 'react';
import { Button, notification, Popover } from 'antd';
import { PlayCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import style from './styled.module.scss';

const ChooseBlock = () => {
  const [isPlayerVisible, setIsPlayerVisible] = React.useState<boolean>(false);

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          setIsPlayerVisible((prev) => !prev);
          notification.close(key);
        }}
      >
        Подтвердить
      </Button>
    );
    notification.open({
      message: 'Прослушайте музыкальное сопровождение',
      description:
        'Музыкальное сопровождение, поможет вам глубже погрузися в мир былин Новгорода',
      btn,
      key,
      placement: 'topLeft',
    });
  };

  return (
    <div className={style.choose__block_wrapper}>
      <div className={`container ${style.choose__content__wrapper}`}>
        <div className={style.choose__content}>
          <div className={style.choose__title}>
            {isPlayerVisible ? (
              <div className={style.content__player}>
                <audio controls>
                  <source src="/church.mp3" type="audio/mpeg" />
                </audio>
                <Button
                  onClick={() => {
                    setIsPlayerVisible((prev) => !prev);
                  }}
                >
                  <CloseCircleOutlined />
                </Button>
              </div>
            ) : (
              <Popover
                content="Нажмите для воспроизведения музыкального сопровождения"
                title=""
                placement="bottomLeft"
              >
                <Button
                  className={style.content__btn}
                  onClick={() => {
                    setIsPlayerVisible((prev) => !prev);
                  }}
                >
                  <PlayCircleOutlined className={style.content__icon} />
                  <span>Музыкальное сопровождение</span>
                </Button>
              </Popover>
            )}
          </div>
          <div className={style.choose__sub_title}>
            Все истории и сказания Новгорода в одном месте
          </div>
          <div className={style.choose__description}>
            С помошью портала
            <span>
              <span> NOV</span>.Legend
            </span>
            , вы почувсвуете атмосферу Новгорода в котором есть место для сказок
            и былин. Услышьте древние сказания и легенды из первых уст и
            почувсвуйте атмосферу древней Руси.
          </div>
          <div className={style.choose__lists_item}>
            <div className={style.right__choose}>
              <div className={style.list__item}>
                Интерактивная карта фольклора
              </div>
              <div className={style.list__item}>
                Исторические факты и древние сказания
              </div>
            </div>
            <div className={style.left__choose}>
              <div className={style.list__item}>
                Подбор индивидуального маршрута
              </div>
              <div className={style.list__item}>
                Уникальное музыкальное сопровождение
              </div>
            </div>
          </div>
          <button className={style.btn__choose_more} type="button">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseBlock;
