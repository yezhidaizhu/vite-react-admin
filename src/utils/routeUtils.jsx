import { lazy } from "react";

/**
 * 懒加载模块
 * @param {*} module 模块路劲
 * @returns
 */
export function load(modulePath) {
  const Comp = lazy(() => modulePath);
  return <Comp />;
}

/**
 * 递归处理路由中所有路由对象
 * @param {*} routes 路由对象数组
 * @param {*} handldNodeFn 处理方法，会传入当前处理的节点
 */
export function handleRoutesEachRoute(routes = [], handldRouteFn) {
  return routes?.map((route) => {
    const { children } = route;
    return {
      ...handldRouteFn?.(route),
      children: children?.length
        ? handleRoutesEachRoute([...children], handldRouteFn)
        : undefined,
    };
  });
}

/**
 * 过滤路由对象
 * 返回新的对象
 */
export function filterRoutes(routes = [], filterFn) {
  const newRoutes = [];

  routes?.map?.((route) => {
    const { children } = route;
    if (filterFn?.(route)) {
      newRoutes.push({
        ...route,
        children: children?.length
          ? filterRoutes([...children], filterFn)
          : undefined,
      });
    }
  });
  return newRoutes;
}

/**
 * 给定一个 Route 对象， 返回其中的自定义属性
 */
export function pickCusAttrOnRoute(routeObj) {
  const {
    // 官方定义的属性
    path,
    index,
    children,
    caseSensitive,
    id,
    loader,
    action,
    element,
    hydrateFallbackElement,
    errorElement,
    Component,
    HydrateFallback,
    ErrorBoundary,
    handle,
    shouldRevalidate,
    lazy,

    // 自定义的属性
    ...cusAttr
  } = routeObj || {};

  return cusAttr;
}

/**
 * 将 "/a/b/c" 路由拆成 ["/","/a","/a/b","/a/b/c"]
 * @param {*} routePath
 */
export function splitRoutePath(routePath = "", splitter = "/") {
  const pathArr = routePath?.split(splitter);

  return (
    pathArr?.map?.((_, index) => {
      return [...pathArr].splice(0, index + 1).join("/");
    }) || []
  );
}
