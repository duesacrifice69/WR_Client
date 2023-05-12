import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import globalReducer from "./state/Mode";
import userReducer from "./state/Auth";
import appReducer from "./state/ApplicationContext";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";

// import reportWebVitals from './reportWebVitals';
// const store = createStore(reducers, compose(applyMiddleware(thunk)));
const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    app: appReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
