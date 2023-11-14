import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "https://assignment.thomso.in";
axios.defaults.headers.common.Authorization = `${
  localStorage.getItem("token") === null
    ? ``
    : `Bearer ${localStorage.getItem("token")}`
}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
