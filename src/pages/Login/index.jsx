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
    <div>
      <Button onClick={() => loginWithRedirect()}>登录</Button>
    </div>
  );
}
