import React, { useRef } from "react";
import dayjs from "dayjs";
import { Button, DatePicker, InputNumber } from "antd";
import { userApi } from "shared/api/userApi";
import { useCreateMeasurementMutation } from "pages/currMeasuremetn/api/measurementsApi";
import { useParams } from "react-router-dom";

const disabledDate = (current) => {
  return current && current > dayjs().endOf("day");
};

export const CMCreate = () => {
  const { curr } = useParams();
  const { data: userData } = userApi.useGetUserDataQuery();

  const [addMeasurement, { isLoading: measurementLoading }] =
    useCreateMeasurementMutation();

  const newMeasurement = useRef({
    size: undefined,
    date: dayjs().format("DD-MMM-YY"),
  });

  const createMeasurement = async () => {
    const payload = {
      id: userData.id,
      date: newMeasurement.current.date,
      type: curr,
      size: newMeasurement.current.size,
    };
    try {
      if (payload.type === undefined) return;

      await addMeasurement(payload);
      newMeasurement.current.size = undefined;
    } catch (error) {
      console.log(error, error.message);
    }
  };

  return (
    <>
      <DatePicker
        defaultValue={dayjs()}
        format={"DD-MMM-YY"}
        allowClear={false}
        disabledDate={disabledDate}
        onChange={(_, date) => (newMeasurement.current.date = date)}
      />

      <InputNumber
        width={10}
        addonAfter="cm"
        autoFocus={true}
        value={newMeasurement.current.size}
        placeholder="enter data"
        onChange={(e) => (newMeasurement.current.size = e)}
      />
      <Button type="primary" onClick={createMeasurement}>
        add
      </Button>
    </>
  );
};
