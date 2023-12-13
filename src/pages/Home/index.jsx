import Content from "@/components/Content";
import ServiceTable from "@/components/ServiceTable";
import useDisclose from "@/hooks/useDisclose";
import { navigate } from "@/routers";
import { SettingFilled } from "@ant-design/icons";
import { Drawer } from "antd";
import { Button, FloatButton } from "antd";
import NewCols from "./components/NewCols";

export default function Home() {
  const disclose = useDisclose(true);

  const cols = [];

  return (
    <Content>
      <NewCols />

      {/* <ServiceTable columns={cols} dataSource={[]} />
      <FloatButton icon={<SettingFilled />} onClick={disclose.onOpen} />
      <Drawer title="新增字段设置" width={600} {...disclose}>
      </Drawer> */}
    </Content>
  );
}
