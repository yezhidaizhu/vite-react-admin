import { atom } from "recoil"

export const appAtom = atom({
  key: "appAtom",
  default: {
    collapsed: false,   // 菜单是否收缩
  }
})