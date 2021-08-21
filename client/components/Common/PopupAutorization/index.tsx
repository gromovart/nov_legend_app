import { Button, Form, Input, Modal } from 'antd';
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
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div className={style.modal__footer}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="ghost" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PopupAuthorization;
