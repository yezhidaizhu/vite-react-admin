import { ProTable, ProTableProps } from "@ant-design/pro-components";
import { Button } from "antd";

export default function ServiceTable(props: ProTableProps<any, any, any>) {
  const { columns, dataSource, rowKey = "id" } = props;

  return <ProTable columns={columns} dataSource={dataSource} rowKey={rowKey} />;
}

export function opts(list = []) {
  return list
    ?.filter((item) => !item?.hidden || item?.show !== false)
    ?.map((item, index) => {
      const { label, children, ...props } = item || {};
      return (
        <Button key={index} type="link" size="small" {...props}>
          {label ?? children}
        </Button>
      );
    });
}

ServiceTable.opts = opts;
