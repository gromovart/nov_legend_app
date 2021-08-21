import { Modal } from 'antd';
import React from 'react';

const ModalVideo = ({ visible, setVisible }) => {
  return (
    <Modal
      title={null}
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width="100%"
      footer={null}
    >
      <div style={{ height: '90vh', margin: '-24px' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/LN29isbbmsk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Modal>
  );
};

export default ModalVideo;
