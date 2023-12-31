import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { GameProvider } from "./components/index";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);
