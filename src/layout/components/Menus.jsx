import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useMatches } from "react-router-dom";

import { useMenus } from "@/hooks/useApp";
import { navigate } from "@/routers";

export default function Menus() {
  const { menus } = useMenus({ created: true });

  const onClickItem = ({ key }) => navigate(key);

  // 被选中的高亮
  const matches = useMatches();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  // 进入页面时，根据路由高亮选择的菜单
  useEffect(() => {
    const keys = matches.map((d) => d.pathname);
    setSelectedKeys(splitRoutePath(keys[keys?.length - 1]));
    setOpenKeys(keys);
  }, [matches]);

  return (
    <Menu
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      theme="dark"
      mode="inline"
      items={menus}
      onSelect={onClickItem}
    />
  );
}

/**
 * 将 "/a/b/c" 路由拆成 ["/","/a","/a/b","/a/b/c"]
 * @param {*} routePath
 */
function splitRoutePath(routePath = "") {
  const pathArr = routePath?.split("/");

  return (
    pathArr?.map?.((_, index) => {
      return [...pathArr].splice(0, index + 1).join("/");
    }) || []
  );
}
