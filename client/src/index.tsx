import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// if (process.env.NODE_ENV === "development") {
//   const { worker } = require("./resources/mocks/index");
//   worker.start();
// }
ReactDOM.render(<App />, document.getElementById("root"));
