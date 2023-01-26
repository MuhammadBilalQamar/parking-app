// REACT AND REACT DOM
import React from "react";
import ReactDOM from "react-dom/client";

// REACT ROUTER COMPONENTS
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ROUTES
import App from "./App";
import {BookParking, Login, Register, ViewBookings, ViewParkings} from "components";

// STYLES
import "./index.css";

// REPORTS
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/view-parking" element={<ViewParkings />} />
        <Route path="/book-parking" element={<BookParking />} />
        <Route path="/view-bookings" element={<ViewBookings />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
