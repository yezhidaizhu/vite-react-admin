import { atom } from "recoil";

export const appAtom = atom({
  key: "appAtom",
  default: {
    collapsed: false, // 菜单是否收缩
    menus: [], // 菜单 {title,key,label,children}[]
    breadCrumbs: [], // 面包屑 {title,pathName,children}[]

  },
});

// 权限集合
export const permissionsAtom = atom({
  key: "permissionsAtom",
  default: [], // string[]
});
