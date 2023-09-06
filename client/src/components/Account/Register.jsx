import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setInputData = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
  console.log(data);

  const registerData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = data;

    if (name === "") {
      alert("Plz fill the name field...");
    } else if (email === "") {
      alert("Please enter your Email...");
    } else if (!email.includes("@")) {
      alert("Invalid Email...");
    } else if (password === "") {
      alert("Password is required");
    } else if (password.length < 6) {
      alert(`Your Password must be atleast 6 characters long`);
    } else if (cpassword === "") {
      alert("Confirm Your Password");
    } else if (cpassword.length < 6) {
      alert(`Your Confirmation Password must be atleast 6 characters long`);
    } else if (password !== cpassword) {
      alert("Password and confirm password does not match..!!!");
    } else {
      //send data to server...
      console.log("Register");

      const record = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword,
        }),
      });

      const res = await record.json();
      console.log(res);

      if (res.status === 201) {
        alert("Email Alredy Exist");
      }

      if (res.status === 202) {
        alert("Registration Successful");
        setData({ ...data, name: "", email: "", password: "", cpassword: "" });
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1>Welcome to Register</h1>
        <br />
        <div className="form">
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={setInputData}
            placeholder="Enter here..."
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={setInputData}
            placeholder="Enter here..."
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={setInputData}
            placeholder="Enter here..."
          />
        </div>
        <br />
        <div className="form">
          <label htmlFor="cpassword">Confirm Password</label>
          <br />
          <input
            type="password"
            name="cpassword"
            value={data.cpassword}
            onChange={setInputData}
            placeholder="Enter here..."
          />
        </div>
        <br />
        <div className="form">
          <button onClick={registerData}>Register</button>
        </div>
        <br />
        <div className="form">
          <p>
            Your Already Account? <NavLink to={"/login"}>Sign In</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
