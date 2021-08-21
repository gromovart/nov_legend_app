import { Form, Input, Modal } from 'antd';
import React from 'react';
import style from './style.module.scss';

const PopupAuthorization = ({ modalVisible, setModal2Visible }) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Modal
      title="Авторизация"
      centered
      visible={modalVisible}
      onOk={() => setModal2Visible(false)}
      onCancel={() => setModal2Visible(false)}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Логин"
          name="name"
          rules={[{ required: true, message: 'Пожалуйста, введите логин' }]}
        >
          <Input className={style.form__input} />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
        >
          <Input.Password className={style.form__input} />
        </Form.Item>

        <div className={style.modal__footer}>
          <button type="submit" className={style.btn__success}>
            Войти
          </button>
          <button
            type="button"
            className={style.btn__cancel}
            onClick={() => setModal2Visible(false)}
          >
            Закрыть
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default PopupAuthorization;
