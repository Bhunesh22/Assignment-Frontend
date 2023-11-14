import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import CircularProgress from "@mui/material/CircularProgress";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const [mob, setMob] = useState("w-50 mx-auto shadow p-4");
  const [size, setSize] = useState(window.innerWidth);
  const updateSize = () => setSize(window.innerWidth);
  useEffect(() => (window.onresize = updateSize), []);

  useEffect(() => {
    if(size <= 700){
      setMob("w-80 mx-auto shadow p-4")
    }
  }, [])

  const formSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post("/user/login", user);
      if (response.status === 200) {
        message.success("You Have Login Successfully");
        setLoading(false);
        localStorage.setItem("token", response?.data?.data?.access);
      }
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      const data = err?.response;
      console.log("register Error:", data);
      message.error(data?.data.message);
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4 ">
      <div className={mob}>
        <h2 className="mb-4 text-center">Login to continue</h2>

        <form onSubmit={formSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark my-2">
          {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    "Submit"
                  )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
