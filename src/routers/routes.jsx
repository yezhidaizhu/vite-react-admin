import { Navigate } from "react-router-dom";
import DefaultLayout from "@/layout";
import Login from "@/pages/Login";
import Error from "@/pages/Error/Error";
import { load } from "@/utils/routeUtils";

import home from "./modules/home";
import demo from "./modules/demo";
import tools from "./modules/tools";

// 菜单上的路由
export const menusRoutes = [...home, ...tools, ...demo];

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    ErrorBoundary: Error,
    children: [
      {
        path: "/",
        element: <Navigate to="/home/curd" />,
      },
      ...menusRoutes,
    ],
  },
  {
    path: "/login",
    title: "登录",
    element: <Login />,
  },
  {
    path: "*?",
    element: load(import("@/pages/Error/404")),
  },
];

export default routes;
