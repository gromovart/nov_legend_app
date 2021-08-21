import React from 'react';
import { Carousel } from 'antd';
import style from './style.module.scss';

const CarouselComponent = () => {
  const ref = React.useRef<any>();
  return (
    <div className={style.carousel__wrapper}>
      <Carousel autoplay ref={ref}>
        <div className={style.content_style}>
          <img src="/nov_footer.jpg" alt="image" />
        </div>
        <div className={style.content_style}>
          <img src="/nov_footer.jpg" alt="image" />
        </div>
        <div className={style.content_style}>
          <img src="/nov_footer.jpg" alt="image" />
        </div>
        <div className={style.content_style}>
          <img src="/nov_footer.jpg" alt="image" />
        </div>
      </Carousel>
      <button
        onClick={() => {
          console.log(ref.current.next());
        }}
      >
        jasndglfkjasndglkjn
      </button>
    </div>
  );
};

export default CarouselComponent;
