import DefaultLayout from "@/layout";
import { createBrowserRouter } from "react-router-dom";
import { home } from "./module/home";
import Login from "@/pages/Login";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        element: <DefaultLayout />,
        children: [...home],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*?",
    element: <Navigate to="/home" />,
  },
];

const router = createBrowserRouter(routes);

export default router;

export const navigate = router.navigate;
