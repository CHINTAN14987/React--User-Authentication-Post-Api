import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const register = async () => {
    setLoading(true);
    setFormValue({});
    await axios({
      method: "post",
      url: "https://ttmg-backend.herokuapp.com/api/auth/staffRegister",
      data: formValue,
    })
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          alert("Registraion is successful");
        }
      })
      .catch((error) => {
        console.log(error.response.status);

        if (error.response.status === 400) {
          setLoading(false);
          console.log("Some of the fields are missing or incorrect");
          alert("Some of the fields are incorrect or missing");
          console.log(error.status);
        } else if (error.response.status === 402) {
          console.log(error.status);
          setLoading(false);
          console.log("User Already Exists with the given email id");
          alert("User Already Exists with given email ID");
        } else {
          setLoading(false);
          alert(error.response);
        }
      });
  };
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    console.log(formValue);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return loading ? (
    <div className="loading">Loading...</div>
  ) : (
    <div>
      <h3 className="heading">Please Register or Login</h3>
      <div className="container">
        <label>Email Address:</label>
        <input value={formValue.email} onChange={handleChange} name="email" />
        <label>Password:</label>
        <input
          value={formValue.password}
          onChange={handleChange}
          name="password"
        />
        <label>Name:</label>
        <input value={formValue.name} onChange={handleChange} name="name" />
        <label>Mobile Number:</label>
        <input value={formValue.mobile} onChange={handleChange} name="mobile" />
        <div className="buttonFlex">
          <button onClick={register}>Sign Up</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
