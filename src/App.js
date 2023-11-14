import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import PlaceOrder from "./Components/PlaceOrder.js";
import Holdings from "./Components/Holdings.js";
import Profile from "./Components/Profile.js";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
