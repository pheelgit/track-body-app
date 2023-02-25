import React from "react";

import { userApi } from "shared/api/userApi";

import { Button, Form, Radio, InputNumber, Space } from "antd";

const GENDER = {
  male: "male",
  female: "female",
};

const BodyInfo = () => {
  const { data: userInfo } = userApi.useGetUserDataQuery();
  const [updateUser] = userApi.useUpdateUserMutation();
  const { gender, age, height, id } = userInfo;

  const handleSubmitForm = async (values) => {
    await updateUser({ id, values });
  };
  return (
    <>
      <Form
        name="bodyInfo"
        onFinish={handleSubmitForm}
        initialValues={{ gender, age, height }}
      >
        <Form.Item label="gender" name="gender">
          <Radio.Group
            optionType="button"
            options={[GENDER.female, GENDER.male]}
          />
        </Form.Item>
        <Form.Item label="age" name="age">
          <InputNumber prefix="years" min={10} max={150} />
        </Form.Item>
        <Form.Item label="height" name="height">
          <InputNumber prefix="cm" min={100} max={250} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit" type="primary" children="submit" />
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default BodyInfo;
