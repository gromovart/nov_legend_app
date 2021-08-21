import React from 'react';
import { Popup } from 'react-leaflet';

const MarkerPopup = ({ data }: any) => {
  return (
    <Popup autoClose={false} className="marker_popup">
      <div className="old-paper">
        <div>
          <span>{data.name}</span>
        </div>
        <div>
          <span>{data.description}</span>
        </div>
      </div>
    </Popup>
  );
};

export default MarkerPopup;
