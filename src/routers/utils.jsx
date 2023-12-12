import { lazy } from "react";

export function load(module) {
  const Comp = lazy(() => module);
  return <Comp />;
}
