import { Navigate } from "react-router-dom";
import DefaultLayout from "@/layout";
import Login from "@/pages/Login";
import Error from "@/pages/Error/Error";
import { load } from "@/utils/routeUtils";

import home from "./modules/home";
import demo from "./modules/demo";

// 这里可自动导入，但是顺序不能保证
// const modules = import.meta.glob("./modules/*.{js,jsx}", { eager: true });
// for (const path in modules) {
//   menusRoutes.push(...(modules[path].default || []));
// }

// 菜单上的路由
export const menusRoutes = [...home, ...demo];

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    ErrorBoundary: Error,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
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
