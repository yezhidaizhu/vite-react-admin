import { Button } from "antd";

export default function NewColsActions({ left = [], right = [] }) {
  return (
    <div className=" flex justify-between gap-2">
      <div className="flex gap-2">
        {left?.map((item, index) => {
          const { label, ...props } = item;
          return (
            <Button key={index} type="primary" {...props}>
              {label}
            </Button>
          );
        })}
      </div>

      <div className="flex gap-2">
        {right?.map((item, index) => {
          const { label, ...props } = item;
          return (
            <Button key={index} type="primary" {...props}>
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
