import { Result, Button } from "antd";
import { navigate } from "@/routers";

export default function Error(x) {
  return (
    <Result
      status="error"
      subTitle="对不起，似乎出了点问题。"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          返回
        </Button>
      }
    />
  );
}
