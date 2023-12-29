import { Result, Button } from "antd";
import { navigate } from "@/routers";

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="很抱歉，您访问的页面不存在。"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          返回首页
        </Button>
      }
    />
  );
}
