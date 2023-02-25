import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, Typography } from "antd";
const { Text } = Typography;

export const MeasurementCard = ({ title }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${title}`);
  };
  return (
    <Card onClick={handleClick}>
      <Text code>{title}</Text>
    </Card>
  );
};
