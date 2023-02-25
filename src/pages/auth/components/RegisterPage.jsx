import React from "react";

import { userApi } from "shared/api/userApi";

import { Button, Form, Input } from "antd";

const RegisterPage = () => {
  const [addUser] = userApi.useCreateUserMutation();

  const handleLogin = async (values) => {
    try {
      await addUser(values);
    } catch (error) {
      console.log(error, error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="authentication"
      onFinish={handleLogin}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="username"
        name="nickName"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterPage;
