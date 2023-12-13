import { navigate } from "@/routers";
import {
  ExperimentOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

export default function Menus() {
  return (
    <Menu
      theme="dark"
      mode="inline"
      // defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          icon: <ExperimentOutlined />,
          label: "CURD",
          onClick() {
            navigate("/home");
          },
        },
        {
          key: "2",
          icon: <ExperimentOutlined />,
          label: "demo",
          onClick() {
            navigate("/demo");
          },
        },
      ]}
    />
  );
}
