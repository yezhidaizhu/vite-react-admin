import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Inspector } from "react-dev-inspector";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Inspector />
  </>
);