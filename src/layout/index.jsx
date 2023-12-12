import { Button, Layout, Menu, Spin, theme } from "antd";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Menus from "./components/Menus";
import Logo from "./components/Logo";
import { useSiderBar } from "@/hooks/useApp";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";

const { Sider, Content } = Layout;

export default function DefaultLayout() {
  const { collapsed, toggleSider } = useSiderBar();

  return (
    <div className=" h-screen overflow-hidden">
      <Layout className=" h-full">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Logo />
          <Menus />
        </Sider>

        <Layout>
          <Header collapsed={collapsed} toggleCollapsed={() => toggleSider()} />

          <Content>
            <ErrorBoundary>
              <Suspense
                fallback={
                  <Spin size="large" className=" h-full w-full mt-[20%]" />
                }
              >
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
