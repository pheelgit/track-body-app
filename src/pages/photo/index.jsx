import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";

import { FloatButton } from "antd";
import CurrentPhoto from "./components/CurrentPhoto";
import AddPhotoModal from "./components/AddPhotoModal";
import { UserNav } from "widgets/userNav";
import { UserLayout } from "shared/ui/userLayout";
import { Header } from "widgets/header";
import { SideBar } from "widgets/sideBar";

export const Photo = () => {
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);

  const content = (
    <>
      <CurrentPhoto />
      <AddPhotoModal show={showAddPhotoModal} setShow={setShowAddPhotoModal} />
      <FloatButton
        style={{ bottom: "80px" }}
        onClick={() => setShowAddPhotoModal(true)}
        icon={<PlusOutlined />}
      />{" "}
    </>
  );

  return (
    <>
      <UserLayout
        header={<Header />}
        sideBar={<SideBar />}
        content={content}
        footer={<UserNav />}
      />
    </>
  );
};
