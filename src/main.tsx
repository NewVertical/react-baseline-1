import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import "./styles/Global.css";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>,
);
