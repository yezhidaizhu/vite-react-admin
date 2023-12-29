import { Result, Button } from "antd";
import { navigate } from "@/routers";

export default function NotAuth() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您无权访问此页面。"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          返回
        </Button>
      }
    />
  );
}
