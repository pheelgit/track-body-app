import { HomeOutlined, CameraOutlined, BugOutlined } from "@ant-design/icons";

export const config = [
  {
    key: "measurement",
    icon: (
      <HomeOutlined
        className="text-xl"
        style={{
          fontSize: "20px",
        }}
      />
    ),
  },

  {
    key: "photo",
    icon: (
      <CameraOutlined
        style={{
          fontSize: "20px",
        }}
      />
    ),
  },
  {
    key: "test",
    icon: (
      <BugOutlined
        style={{
          fontSize: "20px",
        }}
      />
    ),
  },
];
