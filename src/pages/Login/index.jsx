import Config from "@/config";
import { navigate } from "@/routers";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { Form } from "antd";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Index() {
  const { loginWithRedirect } = useAuth0();

  const onLogin = () => {
    navigate("/home");
  };

  useEffect(() => {
    document.title = Config.title + ` - 登录`;
  }, []);

  return (
    <Form className=" w-[400px] m-auto pt-[20vh]">
      {/* <Form.Item>
        <Input size="large" prefix={<UserOutlined />} placeholder="账户" />
      </Form.Item>

      <Form.Item>
        <Input
          size="large"
          prefix={<LockOutlined />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>

      <Button block size="large" type="primary" onClick={onLogin}>
        登录
      </Button> */}

      <Button onClick={() => loginWithRedirect()}>登录</Button>
    </Form>
  );
}
