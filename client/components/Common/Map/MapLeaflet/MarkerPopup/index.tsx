import React from 'react';
import { Popup } from 'react-leaflet';
import style from './style.module.scss';

const MarkerPopup = ({ data }: any) => {
  console.log(data);

  return (
    <Popup autoClose={false}>
      <div className={style.popup_preview_wrapper}>
        <img src={`images/${data?.images?.[0]}`} alt={data?.images?.[0]} />
      </div>
      {/* <div>
        <span className={style.popup_title}>{`Название: `}</span>
        <span className={style.popup_text}>{data.name}</span>
      </div> */}
      {/* {data.shortDescription && (
        <div className={style.popup_text}>
          <span className={style.popup_title}>{`Краткое описание: `}</span>
          <span className={style.popup_text}>{data.shortDescription}</span>
        </div>
      )} */}
    </Popup>
  );
};

export default MarkerPopup;
