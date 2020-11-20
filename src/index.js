import React from "react";
import ReactDOM from "react-dom";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import App from "./App";
import rootReducer from "./slices";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
