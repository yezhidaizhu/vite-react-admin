import { Switch } from "antd";

// 与 Switch 取相反的值
export function ReverseSwitch({ value, onChange }) {
  return <Switch value={!value} onChange={(v) => onChange(!v)} />;
}

export function FCCenter({ children }) {
  return <div className="flex justify-center items-center">{children}</div>;
}
