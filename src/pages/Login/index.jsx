import { navigate } from "@/routers";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { Form } from "antd";

export default () => {
  const onLogin = () => {
    navigate("/home");
  };

  return (
    <Form className=" w-[400px] m-auto mt-[20vh]">
      <Form.Item>
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
      </Button>
    </Form>
  );
};
