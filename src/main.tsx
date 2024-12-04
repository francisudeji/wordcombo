import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

import App from "./App.tsx";
import { GameProvider } from "./components/game-provider/game-provider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <App />
      <Toaster />
    </GameProvider>
  </React.StrictMode>
);
