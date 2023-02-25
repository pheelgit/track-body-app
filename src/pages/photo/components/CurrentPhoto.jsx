import React from "react";

import { Image, Typography, Card, Carousel } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { useDatesToSelect } from "../../../shared/hooks/useDatesToSelect";
import { WatchChanges } from "widgets/watchChanges";
import { userApi } from "shared/api/userApi";
import { useDeletePhotoMutation } from "pages/photo/api/photoApi";

const CurrentPhoto = () => {
  const { allPhotos, arrToSelect } = useDatesToSelect();
  const { data: userData } = userApi.useGetUserDataQuery();
  const [deletePhoto] = useDeletePhotoMutation();

  const handleDeletePhoto = async ({ date, type, url }) => {
    await deletePhoto({ id: userData.id, date, type, url });
  };

  const carouselGroup = arrToSelect?.map(({ value }) => (
    <div key={value}>
      <Typography.Text strong>{value}</Typography.Text>
      <Carousel style={{ background: "gray", paddingBottom: "2.5rem" }}>
        {allPhotos[value].map((el) => {
          const type = Object.keys(el)[0];
          const url = el[type];
          return (
            <Card
              key={`${type}${url}`}
              extra={
                <DeleteOutlined
                  style={{ fontSize: "1.6em", color: "tomato" }}
                  onClick={() => handleDeletePhoto({ date: value, type, url })}
                />
              }
              title={type}
            >
              <Image src={url} />
            </Card>
          );
        })}
      </Carousel>
    </div>
  ));

  return (
    <>
      <br />
      <WatchChanges />
      <br />
      {carouselGroup}
    </>
  );
};

export default CurrentPhoto;
