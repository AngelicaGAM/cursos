import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CoursesProvider } from "./context/CoursesProvider";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CoursesProvider>
        <App />
      </CoursesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
