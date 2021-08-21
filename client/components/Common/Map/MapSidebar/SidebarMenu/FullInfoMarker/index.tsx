import { SoundOutlined } from '@ant-design/icons/lib/icons';
import React from 'react';
import { Divider, Image } from 'antd';
import ModalVideo from './ModalVideo';
import ScrollWrapper from '../../../../ScrollWrapper';
import style from './style.module.scss';

const FullInfoMarker = ({
  name,
  year,
  percent,
  description,
  shortDescription,
}) => {
  const [isPlayAudio, setIsPlayAudio] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const audio = React.useRef(new Audio('/gusli.mp3'));

  const setAudioPlay = () => {
    if (!isPlayAudio) audio.current.play();
    if (isPlayAudio) audio.current.pause();

    setIsPlayAudio((prev) => !prev);
  };

  return (
    <div className={style.card__wrapper}>
      <>
        <div className={style.card__title}>{name}</div>
        {/* <div className={style.card__description}>{year}</div> */}

        <div className={style.card__description}>Популярность:</div>
        <div className={style.popular__line}>
          <div className={style.line__orange} style={{ width: percent }} />
        </div>
        <button
          type="button"
          className={`${style.btn__audio} ${
            isPlayAudio && style.active__music
          }`}
          onClick={setAudioPlay}
        >
          <SoundOutlined />
        </button>
        <ScrollWrapper>
          <div className={style.image__wrapper}>
            <Image
              width={130}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Image
              width={130}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />

            <Image
              width={130}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Image
              width={130}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Image
              width={130}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>
        </ScrollWrapper>
        <button
          className={style.btn__view_video}
          type="button"
          onClick={() => {
            setVisible(true);
          }}
        >
          Видео описание
        </button>
        <ModalVideo visible={visible} setVisible={setVisible} />
        <Divider type="horizontal" className={style.divider} />
        {description && (
          <>
            <div className={style.card__title}>Описание</div>
            <div className={style.card__description}>{description}</div>
          </>
        )}
      </>
    </div>
  );
};

export default FullInfoMarker;
