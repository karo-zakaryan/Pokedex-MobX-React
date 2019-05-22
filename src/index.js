import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import App from "./components/App";
import stores from "./stores";

const app = document.getElementById("root");

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  app
);
