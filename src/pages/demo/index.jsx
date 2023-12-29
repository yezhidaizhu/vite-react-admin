import Page from "@/components/Page";
import { navigate } from "@/routers";
import { api } from "@/utils/request";
import { notification } from "antd";
import { Dropdown } from "antd";
import { message } from "antd";
import { Divider } from "antd";
import { Button } from "antd";
import { useEffect } from "react";

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

  const items = [
    {
      label: "get",
      onClick: async () => {
        const data = await api.get(`/sys-user/currentUser`, { test: 123 });
        notification.success({
          message: "get",
          description: JSON.stringify(data),
        });
      },
    },
    {
      label: "post",
      onClick: () => {
        api.post(`/demo`);
      },
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

      <Divider />

      <Dropdown menu={{ items }}>
        <Button>请求测试</Button>
      </Dropdown>
    </Page>
  );
}
