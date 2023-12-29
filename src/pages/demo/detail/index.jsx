import Page from "@/components/Page";
import { navigate } from "@/routers";
import { Button } from "antd";

export default function Index() {
  return (
    <Page>
      <p>路劲: /demo/detail</p>
      <Button onClick={() => navigate(-1)}>返回</Button>
    </Page>
  );
}
