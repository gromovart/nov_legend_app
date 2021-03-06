import React, { useEffect } from 'react';
import { Button, notification, Popover } from 'antd';
import { PlayCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import style from './styled.module.scss';

const PageHeader = () => {
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

  useEffect(() => {
    openNotification();
  }, []);

  return (
    <div className={`${style.page__header_wrapper}`}>
      <div className={`container ${style.content__header}`}>
        <div>
          <div className={style.description__title}>
            {isPlayerVisible ? (
              <div className={style.content__header__player}>
                <audio controls>
                  <source src="/gusli.mp3" type="audio/mpeg" />
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
                  className={style.content__header__btn}
                  onClick={() => {
                    setIsPlayerVisible((prev) => !prev);
                  }}
                >
                  <PlayCircleOutlined className={style.content__header__icon} />
                  <span>Музыкальное сопровождение</span>
                </Button>
              </Popover>
            )}
          </div>
          <div className={style.page__header_title}>
            Погрузись в мир <br /> былин
          </div>
          <div className={style.header__description}>
            Платформа с первой в России интерактивной картой фольклора <br /> и
            народных сказаний Новгородской области иллюстрированной детьми
          </div>
        </div>
        <button
          type="button"
          className={style.btn__scroll}
          onClick={() => {
            window.scroll({
              top: 1100,
              behavior: 'smooth',
            });
          }}
        >
          К интерактивной карте
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
