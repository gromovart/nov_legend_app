import { Form, Input, Modal } from 'antd';
import axios from 'axios';
import React from 'react';
import style from './style.module.scss';

const PopupRegistration = ({ modalVisible, setModal2Visible, setUserData }) => {
  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:8888/api/sign-up', {
        ...values,
        age: 30,
        avatar: 'string',
      });
      const { data } = await axios.post('http://localhost:8888/api/sign-in', {
        login: values.login,
        password: values.password,
      });

      setUserData(data);
      setModal2Visible(false);
      // localStorage.setItem('userData', JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
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
          label="Имя"
          name="firstName"
          rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
        >
          <Input className={style.form__input} />
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{ required: true, message: 'Пожалуйста, введите фаимлию' }]}
        >
          <Input className={style.form__input} />
        </Form.Item>

        <Form.Item
          label="Логин"
          name="login"
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
            Зарегестрироваться
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

export default PopupRegistration;
