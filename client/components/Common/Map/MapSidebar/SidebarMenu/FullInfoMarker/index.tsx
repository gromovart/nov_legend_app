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
  images,
  video,
  audio: newAudio,
}) => {
  const [isPlayAudio, setIsPlayAudio] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const [audio, setAudio] = React.useState(new Audio(`/${newAudio}`));

  const setAudioPlay = () => {
    if (!isPlayAudio) audio.play();
    if (isPlayAudio) audio.pause();

    setIsPlayAudio((prev) => !prev);
  };

  React.useEffect(() => {
    setAudio(new Audio(`/${newAudio}`));
    audio.pause();
    setIsPlayAudio(false);

    return () => {
      audio.pause();
      setIsPlayAudio(false);
    };
  }, [name]);

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
            {images?.map((item) => (
              <Image width={130} src={`/images/${item}`} />
            ))}
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
        <ModalVideo visible={visible} setVisible={setVisible} url={video} />
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
