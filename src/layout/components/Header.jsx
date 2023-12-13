import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Dropdown,
  theme,
  Avatar as AntdAvatar,
  ColorPicker,
} from "antd";
import AvatarDefaultImg from "@/assets/avatar.webp";

const { Header: AntdHeader } = Layout;

export default function Header({ collapsed, toggleCollapsed }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdHeader
      style={{ backgroundColor: colorBgContainer }}
      className="p-0 flex justify-between"
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />

      <div className="flex items-center pr-4 ">
        <ColorPicker />
        <Avatar />
      </div>
    </AntdHeader>
  );
}

// 头像
function Avatar() {
  const items = [
    // {
    //   type: "divider",
    // },
    {
      key: "1",
      label: <div>退出</div>,
      icon: <LogoutOutlined />,
      onClick() {
        console.log("logout");
      },
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button type="text" className=" h-auto flex items-center gap-2">
        <AntdAvatar src={AvatarDefaultImg} />
        子非鱼
      </Button>
    </Dropdown>
  );
}
