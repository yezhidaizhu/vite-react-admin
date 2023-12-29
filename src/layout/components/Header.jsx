import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  Avatar as AntdAvatar,
  Button,
  ColorPicker,
  Dropdown,
  Layout,
  theme,
} from "antd";

import AvatarDefaultImg from "@/assets/avatar.webp";
import useAuth from "@/hooks/useAuth";

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

      <div className="flex items-center gap-4 pr-4 ">
        <ColorPicker />
        <Avatar />
      </div>
    </AntdHeader>
  );
}

// 头像
function Avatar() {
  const { loginOut } = useAuth();
  const items = [
    // {
    //   type: "divider",
    // },
    {
      key: "1",
      label: <div>退出</div>,
      danger: true,
      icon: <LogoutOutlined />,
      onClick() {
        loginOut();
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
