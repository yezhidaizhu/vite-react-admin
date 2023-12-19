import { Tag } from "antd";
import { Switch } from "antd";

// 与 Switch 取相反的值
export function ReverseSwitch({ value, onChange }) {
  return <Switch value={!value} onChange={(v) => onChange(!v)} />;
}

export function FCCenter({ children, className = "", ...props }) {
  return (
    <div className={`flex justify-center items-center ${className}`} {...props}>
      {children}
    </div>
  );
}

// 统计cols中的情况
export function ColsStatis({ total = 0, cks = 0 }) {
  return (
    <div className="flex gap-3 pb-2">
      <div>
        共<B>{total || 0}</B>项
      </div>

      {!!cks && (
        <Tag color="processing">
          已勾选<B>{cks || 0}</B>项
        </Tag>
      )}
    </div>
  );

  function B({ children }) {
    return <b className="text-blue-600 px-1">{children}</b>;
  }
}
