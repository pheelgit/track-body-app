import React, { useState } from "react";
import dayjs from "dayjs";

import { DatePicker, Form, Modal, Select, Upload, message } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

import { userApi } from "shared/api/userApi";
import photoService from "pages/photo/api/photoService";
import { useAddPhotoMutation } from "pages/photo/api/photoApi";

const selectOption = [
  {
    value: "front",
    label: "спереди",
  },
  {
    value: "side",
    label: "сбоку",
  },
  {
    value: "back",
    label: "сзади",
  },
  {
    value: "face",
    label: "лицо",
  },
];

const defaultPhotoData = {
  date: dayjs(),
  type: selectOption[0].value,
  image: undefined,
};

const AddPhotoModal = ({ show, setShow, initialValues }) => {
  const { data: userData } = userApi.useGetUserDataQuery();

  const [addPhoto] = useAddPhotoMutation();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [imageFileList] = useState();

  const [messageApi, contextHolder] = message.useMessage();

  const handleModalOk = async () => {
    const fieldValues = form.getFieldsValue(true);
    if (!fieldValues.image) {
      messageApi.open({
        key: "updatable",
        type: "warning",
        content: "добавьте изображение!",
      });
      return;
    }

    setConfirmLoading(true);

    const payload = {
      ...fieldValues,
      date: fieldValues.date.format("DD-MMM-YY"),
      id: userData.id,
      image: fieldValues.image.file.originFileObj,
    };

    //add to storage
    const url = await photoService.add(payload);
    payload.image = url;

    //add to firebase
    await addPhoto(payload);

    setConfirmLoading(false);
    setShow(false);
    form.resetFields();
    setImageUrl("");
  };

  const handleModalCancel = () => {
    setShow(false);
    form.resetFields();
    setImageUrl("");
  };

  const handleChangeImage = (info) => {
    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    };
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Modal
      open={show}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
      confirmLoading={confirmLoading}
    >
      {contextHolder}
      <Form form={form} name="add_photo" initialValues={defaultPhotoData}>
        <Form.Item name="date" required>
          <DatePicker format={"DD-MMM-YY"} allowClear={false} />
        </Form.Item>

        <Form.Item label={"type"} name="type">
          <Select options={selectOption} />
        </Form.Item>
        <Form.Item name="image" required>
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            onChange={handleChangeImage}
            fileList={imageFileList}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPhotoModal;
