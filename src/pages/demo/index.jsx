import Page from "@/components/Page";
import { navigate } from "@/routers";
import { Button } from "antd";

export default function Index() {
  const bts = [
    {
      children: "前往无权限页",
      onClick: () => navigate("/nopower"),
    },
    {
      children: "前往详情",
      onClick: () => navigate("/demo/detail"),
    },
  ];

  return (
    <Page>
      <div className=" flex flex-col gap-2">
        {bts.map((item, index) => (
          <div key={index}>
            <Button {...item} />
          </div>
        ))}
      </div>
    </Page>
  );
}
