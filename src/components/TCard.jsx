import { Spin } from "antd";

export default function TCard({
  children,
  rootClassName = "",
  className = "",
  loading = false,

  title,
  actions,

  hidden,
}) {
  return (
    <div hidden={hidden} className={`bg-white p-4 ${rootClassName}`}>
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
