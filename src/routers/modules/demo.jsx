import { load } from "@/utils/routeUtils";
import { ExperimentOutlined } from "@ant-design/icons";

const demo = [
  {
    path: "/demo",
    element: load(import("@/pages/demo")),
    title: "demo",
    icon: <ExperimentOutlined />,
  },

  // 详情
  {
    path: "/demo/detail/:id",
    element: load(import("@/pages/demo/detail")),
    title: "demo详情",
    hideInMenu: true, // 在菜单中隐藏
  },

  // 测试权限
  {
    path: "/nopower",
    element: load(import("@/pages/demo")),
    title: "demo",
    code: "nopower", // 设置权限
  },
];

export default demo;
