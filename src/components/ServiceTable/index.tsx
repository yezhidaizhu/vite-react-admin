import { ProTable,ProTableProps, } from "@ant-design/pro-components";

export default function ServiceTable(props:ProTableProps<any,any,any>) {
  const {columns,dataSource,rowKey="id"} = props;

  return <ProTable columns={columns} dataSource={dataSource} rowKey={rowKey} />;
}
