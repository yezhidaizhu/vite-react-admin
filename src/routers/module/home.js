import { load } from "../utils";

export const home = [
  {
    path: "/home",
    element: load(import("@/pages/Home")),
  },
  {
    path: "/demo",
    element: load(import("@/pages/demo")),
  }
]