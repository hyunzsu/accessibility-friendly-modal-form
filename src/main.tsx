import "modern-normalize";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { OverlayProvider } from "overlay-kit";
import ModalFormPage from "./page/ModalFormPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OverlayProvider>
      <ModalFormPage />
    </OverlayProvider>
  </StrictMode>
);
