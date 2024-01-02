import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";

import { menusRoutes } from "@/routers/routes";
import { appAtom } from "@/stores/app";
import { filterRoutes, handleRoutesEachRoute, splitRoutePath } from "@/utils/routeUtils";

import useAuth from "./useAuth";
import { matchPath } from "react-router-dom";
import { useMatches } from "react-router-dom";

export default function useApp() {
  const appState = useRecoilValue(appAtom);

  return appState;
}

/**
 * 菜单折叠控制
 */
export function useSiderBar() {
  const [appState, setAppState] = useRecoilState(appAtom);

  const toggleSider = (open) => {
    const collapsed = open === undefined ? !appState?.collapsed : !!open;
    setAppState((v) => ({ ...v, collapsed }));
  };

  return { collapsed: appState?.collapsed, toggleSider };
}

/**
 * 左侧菜单
 * created 是否根据权限与路由生成菜单，避免别的地方引用的时候再次生成
 */
export function useMenus({ created = false } = {}) {
  const [appState, setAppState] = useRecoilState(appAtom);
  const { hasPermissions } = useAuth();

  /**
   * 根据权限与路由设置菜单
   */
  useEffect(() => {
    if (!created) return;

    // 过滤有效路由
    const enableRoutes = filterRoutes(menusRoutes, (route) => {
      const hasPower = route?.code ? hasPermissions(route?.code) : true;
      return hasPower && !route?.hideInMenu;
    });

    // 格式化菜单
    const menus = handleRoutesEachRoute(enableRoutes, (menu) => {
      return {
        ...menu,
        key: menu?.path,
        label: menu?.title,
        children: menu?.children?.length ? [...(menu?.children || [])] : undefined,
      };
    });

    setAppState((v) => ({ ...v, menus }));
  }, [created, hasPermissions, setAppState]);

  return { menus: appState.menus };
}


/**
 * 面包屑
 */
export function useBreadCrumb({ created = false } = {}) {
  const [appState, setAppState] = useRecoilState(appAtom);

  const matches = useMatches();

  // 根据当前路由，自动判断面包屑路劲
  useEffect(() => {
    if (!created) return;

    const paths = splitRoutePath(matches[matches?.length - 1]?.pathname);
    const breadCrumbs = [];

    handleRoutesEachRoute(menusRoutes, (route) => {
      const pattern = route?.path;
      paths?.map((pathName) => {
        if (!matchPath(pattern, pathName)) return;
        breadCrumbs.push({
          title: route?.title,
          pathName,
          pattern
        })
      })
    });

    setAppState(v => ({ ...v, breadCrumbs }));
  }, [matches, setAppState, created])

  // 面包屑生成 
  return { breadCrumbs: appState.breadCrumbs };
}