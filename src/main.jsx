import "./index.css";

import { Inspector } from "react-dev-inspector";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Inspector />
  </>
);
