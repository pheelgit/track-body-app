import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";

import "app/dataBase/firebaseAppDb";

import "./utils/resizeHeight";
import "./index.css";

import { StyleProvider } from "@ant-design/cssinjs";

import AppRouter from "pages";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Provider store={store}>
          <StyleProvider hashPriority="high">
            <AppRouter />
          </StyleProvider>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
