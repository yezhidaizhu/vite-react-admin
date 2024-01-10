import { load } from "@/utils/routeUtils";
import { ToolOutlined } from "@ant-design/icons";

const tools = [
  {
    path: "/tools",
    title: "工具",
    icon: <ToolOutlined />,
    children: [
      {
        path: "/tools/gen",
        title: "生成",
        element: load(import("@/pages/Tools/Gen")),
      }
    ]
  },
];

export default tools;
