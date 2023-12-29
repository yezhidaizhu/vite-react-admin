import { createHashRouter } from "react-router-dom";
import { handleRoutesEachRoute, pickCusAttrOnRoute } from "@/utils/routeUtils";
import routes from "./routes";

handleRoutesEachRoute(routes, (route) => {
  /**
   * 将自定义的属性写入 handle 属性中，
   * 让在使用 useMatches 时，能获取到自定义的属性
   */
  const cusAttr = pickCusAttrOnRoute(route);
  route.handle = route.handle ?? {};
  Object.assign(route.handle, cusAttr);
});

const router = createHashRouter(routes);

export default router;

export const { navigate } = router;
