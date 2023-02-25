import React, { useRef, useState } from "react";
import dayjs from "dayjs";

import { useParams } from "react-router-dom";
import { useMeasurementData } from "pages/currMeasuremetn/hooks/useMeasurementData";

import { Button, DatePicker, InputNumber, Modal, Table } from "antd";
import {
  useDeleteMeasurementMutation,
  useUpdateMeasurementMutation,
} from "pages/currMeasuremetn/api/measurementsApi";
import { userApi } from "shared/api/userApi";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
  },
];

export const CMTable = () => {
  const { curr } = useParams();

  const { data: userData } = userApi.useGetUserDataQuery();

  const [deleteMeasurement] = useDeleteMeasurementMutation();
  const [updateMeasurement] = useUpdateMeasurementMutation();

  const modalData = useRef({ size: null, date: null });
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const currData = useMeasurementData();

  const handleTableClick = (record, rowIndex) => {
    const date = dayjs(record.date);
    modalData.current = { date, size: record.size };
    setShowModal(true);
    console.log(modalData.current);
  };

  const handleOkModal = async () => {
    setConfirmLoading(true);

    const date = modalData.current.date;
    const dateFormat = date.format("DD-MMM-YY");
    const payload = {
      type: curr,
      id: userData.id,
      date: dateFormat,
      data: { size: modalData.current.size },
    };
    try {
      await updateMeasurement(payload);

      setShowModal(false);
      setConfirmLoading(false);
      modalData.current = { date: {}, size: 0 };
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelModal = () => {
    setShowModal(false);
    modalData.current = { date: {}, size: 0 };
  };

  const handleDeleteMeasurement = async () => {
    const date = modalData.current.date;
    const dateFormat = date.format("DD-MMM-YY");
    const payload = {
      type: curr,
      id: userData.id,
      date: dateFormat,
    };
    try {
      await deleteMeasurement(payload);
      handleCancelModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={currData}
        pagination={{
          position: ["none", "none"],
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => handleTableClick(record, rowIndex),
          };
        }}
      />
      <Modal
        title="Edit measurement"
        open={showModal}
        onOk={handleOkModal}
        confirmLoading={confirmLoading}
        onCancel={handleCancelModal}
      >
        <DatePicker
          disabled
          value={modalData.current.date}
          format={"DD-MMM-YY"}
        />
        <InputNumber
          value={modalData.current.size}
          onChange={(e) => (modalData.current.size = e)}
          addonAfter="cm"
        />
        <Button danger onClick={handleDeleteMeasurement} children="delete" />
      </Modal>
    </>
  );
};
