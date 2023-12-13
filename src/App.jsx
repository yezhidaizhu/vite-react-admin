import { Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";

import router from "@/routers";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

function App() {
  const [count, setCount] = useState(0);

  return (
    <RecoilRoot>
      <ConfigProvider locale={zhCN}>
        <Suspense fallback={<>loading...</>}>
          <RouterProvider router={router} />
        </Suspense>
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default App;
