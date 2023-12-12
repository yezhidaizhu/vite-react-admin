import { appAtom } from "@/stores/app";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";

export default function useApp() {
  const appState = useRecoilValue(appAtom);

  return appState;
}


// 菜单控制
export function useSiderBar() {
  const [appState, setAppState] = useRecoilState(appAtom);

  const toggleSider = (open) => {
    const collapsed = open === undefined ? !appState?.collapsed : !!open;
    setAppState((v) => ({ ...v, collapsed }))
  };

  return { collapsed: appState?.collapsed, toggleSider }
}
