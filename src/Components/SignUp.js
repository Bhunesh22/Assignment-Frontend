import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = (props) => {
  const [loading, setLoading] = useState(false);
  const [cpassword, setCpassword] = useState({cpassword:""});
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    user_type: "individual",
    broker: "Zerodha",
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

    setLoading({ loading: true });

    if(cpassword.cpassword === user.password){

      try {
        const response = await axios.post("/user/register", user);
        if (response.status === 201) {
          message.success("You Have Registerd Successfully");
          setLoading(false);
        }
        setLoading(false);
        navigate("/login");
      } catch (err) {
        setLoading(false);
        const data = err?.response;
        console.log("register Error:", data);
        message.error(data?.data.message);
        setLoading(false);
      }

    }else{
      message.error("Please Enter Correct Confirm Password");
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChange1 = (e) => {
    console.log(e, "select");
    setUser({ ...user, user_type: e.target.value });
  };

  const handleChange2 = (e) => {
    console.log(e.target.value, "select");
    setUser({ ...user, broker: e.target.value });
  };

  const handleChange3 = (e) => {
    setCpassword({ ...cpassword, [e.target.name]: e.target.value });
  };

  const broker_choice = [
    { value: "Zerodha", label: "Zerodha" },
    { value: "Groww", label: "Groww" },
    { value: "Angel One", label: "Angel One" },
    { value: "Upstox", label: "Upstox" },
    { value: "ICICIdirect", label: "ICICIdirect" }
  ];
  const options = broker_choice.map((item) => {
    return <option value={item.value} key={item.value}>{item.label}</option>;
  })

  return (
    <div className="container my-4 ">
      <div className={mob}>
        <h2 className="mb-4 text-center">Create account to use the app</h2>
        <form className="row g-3" onSubmit={formSubmit}>
          <div className=" col-12">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control "
              id="name"
              name="user_name"
              onChange={onChange}
              required
            />
          </div>
          <div className=" col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control "
              id="email"
              name="email"
              onChange={onChange}
              required
            />
          </div>
          <div className=" col-12">
            <label htmlFor="type" className="form-label">
              Select User Type
            </label>
            <select className="form-select" aria-label="Default select example" id="type" name="user_type" required onChange={handleChange1}>
              <option hidden disabled>Select</option>
              <option value="individual">Individual</option>
              <option value="team">Team</option>
            </select>
          </div>
          <div className=" col-12">
            <label htmlFor="email" className="form-label">
            Select Broker
            </label>
            <select className="form-select" aria-label="Default select example" name="broker"  required onChange={handleChange2}>
              <option hidden disabled>Select</option>
              {options}
            </select>
          </div>
          <div className=" col-12">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="text"
              className="form-control "
              id="password"
              name="password"
              onChange={onChange}
              minLength={8}
              required
            />
          </div>
          <div className=" col-12">
            <label htmlFor="cpassword" className="form-label">
              Comfrim Password
            </label>
            <input
              type="text"
              className="form-control "
              id="cpassword"
              name="cpassword"
              onChange={handleChange3}
              minLength={8}
              required
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-dark my-2">
            {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    "Submit"
                  )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
