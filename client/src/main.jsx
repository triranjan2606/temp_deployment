import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { CasesProvider } from "./context/CasesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CasesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CasesProvider>
  </StrictMode>
);
