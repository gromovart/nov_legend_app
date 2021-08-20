import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
// import './scroll.scss';

const ScrollWrapper = ({
  maxHeight = 200,
  minHeight = 30,
  width,
  children,
  scrollHandler = null,
  scrollRef,
}: any) => {
  return (
    <Scrollbars
      ref={scrollRef}
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{ ...style, width: '4px' }}
          className="track-vertical"
        />
      )}
      renderThumbVertical={(props) => (
        <div {...props} className="thumb-vertical" />
      )}
      autoHide
      autoHeight
      width={width}
      onScrollStop={scrollHandler}
      autoHeightMin={minHeight}
      autoHeightMax={maxHeight}
    >
      {children}
    </Scrollbars>
  );
};

export default ScrollWrapper;
