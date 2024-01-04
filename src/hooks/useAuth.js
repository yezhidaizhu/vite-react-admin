import { navigate } from "@/routers";
import { permissionsAtom } from "@/stores/app";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { useAuth0 } from "@auth0/auth0-react";

/**
 *  登录/权限验证
 */
export default function useAuth() {
  const [permissions, setPermissions] = useRecoilState(permissionsAtom);

  // 检查是否拥有权限
  const hasPermissions = useCallback((code) => {
    return permissions?.includes(code);
  }, [permissions])


  const { logout } = useAuth0();
  // 退出登录
  const loginOut = useCallback(async () => {
    logout();
    // navigate("/login", { replace: true });
  }, []);

  return { loginOut, hasPermissions, permissions, setPermissions };
}