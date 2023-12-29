import { load } from "@/utils/routeUtils";
import { ExperimentOutlined, HomeOutlined } from "@ant-design/icons";

const home = [
  {
    path: "/home",
    element: load(import("@/pages/Home")),
    title: "首页",
    icon: <HomeOutlined />,
  },
];

export default home;
