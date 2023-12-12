import { Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";

import router from "@/routers";
import { RecoilRoot } from "recoil";

function App() {
  const [count, setCount] = useState(0);

  return (
    <RecoilRoot>
      <Suspense fallback={<>loading...</>}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
