import React from "react";

import { authService } from "shared/api/authService";

import { Button, Form, Input } from "antd";

const LoginPage = () => {
  const handleLogin = (values) => {
    authService.logIn(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="authentication"
      onFinish={handleLogin}
      onFinishFailed={onFinishFailed}
      initialValues={{ email: "work@ya.ru", password: "йцуйцуйцу" }}
    >
      <Form.Item
        label="email"
        name="email"
        defaultValue="qwe"
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
          login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
