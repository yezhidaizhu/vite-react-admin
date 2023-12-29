import { javascript } from "@codemirror/lang-javascript";
import ReactCodeMirror from "@uiw/react-codemirror";
import copy from "copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

import { fmColsStrToCodeView } from "../utils";

export default function CodeView({ value = [] }) { 
  const valueStr = fmColsStrToCodeView(value);
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
