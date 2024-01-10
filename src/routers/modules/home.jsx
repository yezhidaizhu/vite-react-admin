import { load } from "@/utils/routeUtils";
import { HomeOutlined } from "@ant-design/icons";

const home = [
  {
    path: "/home",
    title: "首页",
    icon: <HomeOutlined />,
    children: [
      {
        path: "/home/curd",
        title: "CURD",
        element: load(import("@/pages/Home")),
      },
    ]
  },
];

export default home;
