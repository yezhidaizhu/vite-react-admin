import { Layout } from "antd";
import { Spin } from "antd";
import { Suspense, useEffect } from "react";
import { Outlet, useMatches } from "react-router-dom";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";

import { useSiderBar } from "@/hooks/useApp";
import Config from "@/config";

import AuthRoute from "./components/AuthRoute";
import Header from "./components/Header";
import Menus from "./components/Menus";
import Logo from "./components/Logo";

const { Sider, Content } = Layout;

export default function DefaultLayout() {
  const { collapsed, toggleSider } = useSiderBar();

  const nav = useMatches();

  // 设置 title
  useEffect(() => {
    const pathTitle = nav[nav.length - 1]?.handle?.title;
    document.title = Config.title + (pathTitle ? ` - ${pathTitle}` : ``);
  }, [nav]);

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
                <Suspense
                  fallback={
                    <Spin size="large" className=" h-full w-full mt-[20%]" />
                  }
                >
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
