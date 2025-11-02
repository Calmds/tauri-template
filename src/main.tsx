import React from "react";
import store from "@/actions";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import AuthInterceptor from "@/layout/auth";
import { BrowserRouter } from "react-router-dom";
import AntdConfigProvider from "@/components/antd-ext/config-provider";
import './main.css';

ReactDOM
  .createRoot(document.getElementById("root") as HTMLElement)
  .render(
    <div onContextMenu={(e) => e.preventDefault()}>
      <React.StrictMode>
        <Provider store={store} >
          <BrowserRouter>
            <AntdConfigProvider>
              <AuthInterceptor />
            </AntdConfigProvider>
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    </div>
  );