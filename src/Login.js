import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: " ",
  });

  const handleLoginChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    register();
  };
  const handleBack = () => {
    navigate(-1);
  };

  const register = async () => {
    setLoading(true);
    const response = await axios({
      method: "post",
      url: "https://ttmg-backend.herokuapp.com/api/auth/staffLogin",
      data: data,
      // headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        // console.log(response.status, "Status");
        if (response.status === 200) {
          setLoading(false);

          navigate("/page");
        }
      })
      .catch(function (error) {
        //handle error
        if (error.response.status === 400) {
          alert("Email and Password is missing");
          setLoading(false);
        } else if (error.response.status === 401) {
          setLoading(false);
          alert("Email or password is incorrect");
        } else {
          setLoading(false);
          alert(error.response);
        }
      });
  };
  return loading ? (
    <div className="loading">loading....</div>
  ) : (
    <div className="loginContainer">
      <label>Email Address</label>
      <input value={data.email} onChange={handleLoginChange} name="email" />
      <label>Password</label>
      <input
        value={data.password}
        onChange={handleLoginChange}
        name="password"
      />
      <div className="buttonFlex">
        <button onClick={handleClick}>Submit</button>
        <button onClick={handleBack}>Go Back</button>
      </div>
    </div>
  );
};

export default Login;
