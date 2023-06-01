import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/reset.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/whats-app/">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
