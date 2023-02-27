import React from "react";
import dayjs from "dayjs";

import { userApi } from "shared/api/userApi";

import {
  Button,
  Form,
  Radio,
  InputNumber,
  Space,
  DatePicker,
  message,
} from "antd";

const GENDER = {
  male: "male",
  female: "female",
};

export const BodyInfo = () => {
  const { data: userInfo } = userApi.useGetUserDataQuery();
  const [updateUser] = userApi.useUpdateUserMutation();
  const { gender, birthday, height, id } = userInfo;

  const [messageApi, contextHolder] = message.useMessage();

  const key = "updatable";

  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Обновление...",
    });
  };

  const successMessage = () => {
    messageApi.open({
      key,
      type: "success",
      content: "Данные обновлены!",
      duration: 2,
    });
  };

  const handleSubmitForm = async (values) => {
    const payload = {
      ...values,
      birthday: values.birthday.format("DD-MMM-YY"),
    };
    openMessage();

    await updateUser({ id, payload });
    successMessage();
  };

  return (
    <>
      {contextHolder}
      <Form
        name="bodyInfo"
        onFinish={handleSubmitForm}
        initialValues={{
          gender,
          birthday: dayjs(birthday),
          height,
        }}
      >
        <Form.Item label="пол" name="gender">
          <Radio.Group
            optionType="button"
            options={[GENDER.female, GENDER.male]}
          />
        </Form.Item>
        <Form.Item label="дата рождения" name="birthday">
          <DatePicker
            placeholder="дата рождения"
            format={"DD-MMM-YY"}
            allowClear={false}
            disabledDate={(current) => {
              return current > dayjs().endOf("day");
            }}
          />
        </Form.Item>

        <Form.Item label="рост" name="height">
          <InputNumber prefix="cm" min={100} max={250} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit" type="primary" children="обновить" />
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
