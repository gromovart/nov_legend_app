import React from 'react';
import Image from 'next/image';
import image from './group28.png';
import style from './styled.module.scss';

const ChooseBlock = () => {
  return (
    <div className="container">
      <div className={style.choose__block_wrapper}>
        <Image src={image} alt="image" layout="fixed" />
        <div className={style.choose__content}>
          <div className={style.choose__title}>Why Choose Us</div>
          <div className={style.choose__sub_title}>
            We care for 100% customer satifiction
          </div>
          <div className={style.choose__description}>
            There was consensus, not surprisingly, that quality traditional
            travel agencies provide value for money. However, this was
            accompanied by a high level of concern that many consumers
          </div>
          <div className={style.choose__lists_item}>
            <div className={style.right__choose}>
              <div className={style.list__item}>Budget Friendly</div>
              <div className={style.list__item}>Safety Management</div>
              <div className={style.list__item}>Customise Pack</div>
            </div>
            <div className={style.left__choose}>
              <div className={style.list__item}>Expert Team</div>
              <div className={style.list__item}>Payment Flexibility</div>
              <div className={style.list__item}>Friendly Unit</div>
            </div>
          </div>
          <button className={style.btn__choose_more} type="button">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseBlock;
