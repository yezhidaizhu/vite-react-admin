import DefaultLayout from "@/layout";
import { createBrowserRouter } from "react-router-dom";
import { home } from "./module/home";
import Login from "@/pages/Login";

const routes = [
  {
    path: "/",
    children: [
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
];

const router = createBrowserRouter(routes);

export default router;

export const navigate = router.navigate;
