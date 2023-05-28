import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Radio } from "antd";

const AuthNav = () => {
  // eslint-disable-next-line
  let [_, setSearchParams] = useSearchParams();

  //set default params
  // useEffect(() => {
  //   setSearchParams({ type: "login" });
  // }, [setSearchParams]);

  const handleParams = ({ target: { value } }) => {
    setSearchParams({ type: value });
  };

  return (
    <Radio.Group
      defaultValue="login"
      buttonStyle="solid"
      size="large"
      onChange={handleParams}
    >
      <Radio.Button value="login">login</Radio.Button>
      <Radio.Button value="registration">registration</Radio.Button>
    </Radio.Group>
  );
};

export default AuthNav;
