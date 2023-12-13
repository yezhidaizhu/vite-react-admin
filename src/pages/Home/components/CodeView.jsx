import ReactCodeMirror from "@uiw/react-codemirror";
import copy from "copy-to-clipboard";
import { javascript } from "@codemirror/lang-javascript";
import { CopyOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useMemo } from "react";

export default function CodeView({ value = [] }) {
  const valueStr = fmStr(value);
  return (
    <div className="h-full w-[360px] relative">
      <ReactCodeMirror
        value={valueStr}
        readOnly
        theme={"dark"}
        extensions={[javascript({ jsx: true })]}
        basicSetup={{
          lineNumbers: false,
        }}
        className="  h-full w-full overflow-auto text-[18px]"
      />

      <div className=" absolute top-2 right-4">
        <Button
          type="primary"
          onClick={() => {
            copy(valueStr);
            message.success("复制成功");
          }}
        >
          <CopyOutlined />
          复制
        </Button>
      </div>
    </div>
  );
}

const fmStr = (valueObj) => {
  let str = stringify(valueObj);
  const fn = (val, rd) => {
    return val;
  };
  str = str.replaceAll(/\"\(val, rd\)[^"]+/g, "xxx");
  return str;
};

const stringify = (obj) => {
  return JSON.stringify(
    obj,
    (k, v) => {
      if (typeof v === "function") {
        return `${v}`;
      } else {
        return v;
      }
    },
    2
  );
};
