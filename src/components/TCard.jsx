import { Spin } from "antd";

export default function TCard({
  children,
  className = "",
  loading = false,

  title,
  actions,
}) {
  return (
    <div className=" bg-white p-4">
      <div className=" flex justify-between">
        <div className=" text-lg">{title}</div>
        <div>{actions}</div>
      </div>

      <Spin spinning={loading}>
        <div className={className}>{children}</div>
      </Spin>
    </div>
  );
}
