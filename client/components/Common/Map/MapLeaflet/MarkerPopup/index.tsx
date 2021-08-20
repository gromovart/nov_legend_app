import React from 'react';
import { Popup } from 'react-leaflet';

const MarkerPopup = (props: any) => {
  const { data, CustomPopup } = props;
  const category = data.mapCategories
    .map((elem: any) => elem.title)
    .join(' | ');
  return (
    <Popup autoPan={false} className="marker_popup">
      <CustomPopup {...data} category={category} />
    </Popup>
  );
};

export default MarkerPopup;
