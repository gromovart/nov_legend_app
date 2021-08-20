import React from 'react';
import { Popup } from 'react-leaflet';

const MarkerPopup = ({ data }: any) => {
  return (
    <Popup autoPan={false} className="marker_popup">
      <div>
        <span>{data.title}</span>
      </div>
      <div>
        <span>{data.description}</span>
      </div>
    </Popup>
  );
};

export default MarkerPopup;
