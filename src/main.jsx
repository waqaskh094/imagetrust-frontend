import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// ?demo=real | fake | uncertain | loading | selected | drag-over | error-type | error-size | error-server
// shows a fixed state for design review. Without it the app is live.
const demo = new URLSearchParams(window.location.search).get("demo") ?? undefined;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App demo={demo} />
  </StrictMode>,
);
