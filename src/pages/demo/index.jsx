import Content from "@/components/Content";
import ServiceTable from "@/components/ServiceTable";
import api from "@/utils/request";

export default function Index() {
  const cols = [
    {
      title: "A",
      dataIndex: "id",
    },
    {
      title: "B",
      dataIndex: "xx",
    },
  ];

  const dataSource = [
    {
      id: "0",
      xx: 1,
    },
    {
      id: "2",
      xx: 4,
    },
  ];
  api();
  return (
    <Content>
      <ServiceTable columns={cols} dataSource={dataSource} />
    </Content>
  );
}
