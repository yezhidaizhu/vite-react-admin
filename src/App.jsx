import { ConfigProvider } from "antd";
import { Spin } from "antd";
import zhCN from "antd/locale/zh_CN";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import router from "@/routers";

function App() {
  return (
    <RecoilRoot>
      <ConfigProvider locale={zhCN}>
        <Suspense
          fallback={
            <Spin
              size="large"
              className="flex justify-center items-center h-screen"
            />
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default App;
