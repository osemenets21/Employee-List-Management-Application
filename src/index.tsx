import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { WorkersListContextProvider } from "./context/WorkersListContext";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <WorkersListContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WorkersListContextProvider>
);
