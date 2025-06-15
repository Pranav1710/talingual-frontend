import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FormattingProvider } from "./context/FormattingContext";
import "./styles/app.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FormattingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FormattingProvider>
  </React.StrictMode>
);
