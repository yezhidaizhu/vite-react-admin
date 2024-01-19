import { Layout } from "antd";
import { Spin } from "antd";
import { Suspense, useEffect } from "react";
import { Outlet, useMatches } from "react-router-dom";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import { useAuth0 } from "@auth0/auth0-react";

import { useSiderBar } from "@/hooks/useApp";
import Config from "@/config";

import AuthRoute from "./components/AuthRoute";
import Header from "./components/Header";
import Menus from "./components/Menus";
import Logo from "./components/Logo";
import { navigate } from "@/routers";
import { isDev } from "@/utils/helper";

const { Sider, Content } = Layout;

export default function DefaultLayout() {
  const { isAuthenticated, isLoading } = useAuth0();

  const { collapsed, toggleSider } = useSiderBar();

  const nav = useMatches();

  // 设置 title
  useEffect(() => {
    const pathTitle = nav[nav.length - 1]?.handle?.title;
    document.title = Config.title + (pathTitle ? ` - ${pathTitle}` : ``);
  }, [nav]);

  if (!isDev) {
    if (isLoading) {
      return <SpinLoading />;
    }

    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }
  }


  return (
    <div className=" h-screen overflow-hidden">
      <Layout className="h-full">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Logo />
          <Menus />
        </Sider>

        <Layout>
          <Header collapsed={collapsed} toggleCollapsed={() => toggleSider()} />

          <ErrorBoundary>
            <AuthRoute>
              <Content>
                <Suspense fallback={<SpinLoading />}>
                  <Outlet />
                </Suspense>
              </Content>
            </AuthRoute>
          </ErrorBoundary>
        </Layout>
      </Layout>
    </div>
  );
}

function SpinLoading() {
  return <Spin size="large" className=" h-full w-full mt-[20%]" />;
}
