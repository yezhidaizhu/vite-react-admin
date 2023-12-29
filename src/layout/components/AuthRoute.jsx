import { useMemo } from "react";
import { useMatches } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import NotAuth from "@/pages/Error/403";

/**
 * 检验当前路由是否拥有权限
 */

export default function AuthRoute({ children }) {
  const matches = useMatches();
  const curRoute = useMemo(() => matches?.[matches?.length - 1], [matches]);

  const { hasPermissions } = useAuth();

  if (curRoute.handle?.code && !hasPermissions(curRoute.handle?.code)) {
    return <NotAuth />;
  }

  return <>{children}</>;
}
