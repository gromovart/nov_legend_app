import React from 'react';
import { Carousel } from 'antd';
import style from './style.module.scss';

const CarouselComponent = () => {
  const ref = React.useRef<any>();
  return (
    <div className={style.carousel__wrapper}>
      <Carousel autoplay ref={ref}>
        <div className={style.content_style}>
          <img src="/images/perin_1.png" alt="image" />
        </div>
        <div className={style.content_style}>
          <img src="/images/perin_2.jpg" alt="image" />
        </div>
        <div className={style.content_style}>
          <img src="/images/perin_3.jpeg" alt="image" />
        </div>
        <div className={style.content_style}>
          <img src="/images/ilmen_1.jpeg" alt="image" />
        </div>
      </Carousel>
      <button
        type="button"
        className={style.btn_next}
        onClick={() => {
          ref.current.next();
        }}
      />
      <button
        type="button"
        className={style.btn_prev}
        onClick={() => {
          ref.current.prev();
        }}
      />
    </div>
  );
};

export default CarouselComponent;
