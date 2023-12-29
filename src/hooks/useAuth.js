import { navigate } from "@/routers";
import { permissionsAtom } from "@/stores/app";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

/**
 *  登录/权限验证
 */
export default function useAuth() {
  const [permissions, setPermissions] = useRecoilState(permissionsAtom);

  // 检查是否拥有权限
  const hasPermissions = useCallback((code) => {
    return permissions?.includes(code);
  }, [permissions])


  // 退出登录
  const loginOut = useCallback(async () => {
    navigate("/login", { replace: true });
  }, []);

  return { loginOut, hasPermissions, permissions, setPermissions };
}