import React from "react";
import ReactCompareImage from "react-compare-image";

import { useChanges } from "../hooks/useChanges";
import { Modal, Select, Tag } from "antd";
import Typography from "antd/es/typography/Typography";

export const WatchChanges = () => {
  const {
    arrToSelect,
    handleChangeFirstDate,
    secondSelect,
    handleChangeSecondDate,
    typeSelect,
    handleChangeTypeSelect,
    showEqualModal,
    setShowEqualModal,
    compareImgagesUrls,
  } = useChanges();

  return (
    <div className="ml-4">
      <Typography.Paragraph children="view differents:" />
      <Select
        options={arrToSelect}
        onChange={handleChangeFirstDate}
        style={{ minWidth: "100px" }}
      />
      <Select
        value={secondSelect.current}
        options={secondSelect.values}
        onChange={handleChangeSecondDate}
        disabled={secondSelect.disabled}
        style={{ minWidth: "100px" }}
      />

      {typeSelect.values.length === 0 ? (
        <Tag color="volcano">no matches</Tag>
      ) : (
        <Select
          options={typeSelect.values}
          disabled={typeSelect.disabled}
          value={typeSelect.current}
          onChange={handleChangeTypeSelect}
          style={{ minWidth: "100px" }}
        />
      )}
      <Modal
        open={showEqualModal}
        onOk={() => setShowEqualModal(false)}
        onCancel={() => setShowEqualModal(false)}
      >
        <ReactCompareImage
          leftImage={compareImgagesUrls.left}
          rightImage={compareImgagesUrls.right}
        />
      </Modal>
    </div>
  );
};
