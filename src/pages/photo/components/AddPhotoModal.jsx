import React, { useState } from "react";
import dayjs from "dayjs";

import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

import { userApi } from "shared/api/userApi";
import photoService from "pages/photo/api/photoService";
import { useAddPhotoMutation } from "pages/photo/api/photoApi";

const defaultPhotoData = {
  date: dayjs(),
  type: "",
  image: "",
};

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

const AddPhotoModal = ({ show, setShow, initialValues }) => {
  const { data: userData } = userApi.useGetUserDataQuery();

  const [addPhoto] = useAddPhotoMutation();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [imageFileList, setImageFileList] = useState();

  const handleModalOk = async () => {
    setConfirmLoading(true);
    const fieldValues = form.getFieldsValue(true);

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

  const test = () => {
    console.log(form.getFieldsValue(true));
  };

  return (
    <Modal
      open={show}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        name="add_photo"
        // onFinish={handleForm}
        initialValues={defaultPhotoData}
      >
        <Button onClick={test}>formState</Button>

        <Form.Item name="date" required>
          <DatePicker format={"DD-MMM-YY"} allowClear={false} />
        </Form.Item>

        <Form.Item label={"type"} name="type" required>
          <Select options={selectOption} />
        </Form.Item>
        <Form.Item name="image">
          <Upload
            name="avatar"
            listType="picture-card"
            action={null}
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
