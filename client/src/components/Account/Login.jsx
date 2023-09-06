import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const setInputData = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
  console.log(data);

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    if (email === "") {
      alert("Please enter your Email");
    } else if (!email.includes("@")) {
      alert("Invalid Email");
    } else if (password === "") {
      alert("Password is required");
    } else if (password.length < 6) {
      alert(`Your Password must be at least 6 characters long`);
    } else {
      console.log("login");

      const datafetch = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await datafetch.json();
      console.log(res);

      if (res.status === 202) {
        alert("Your Email not Found?");
      }

      if (res.status === 203) {
        alert("Your Password not match");
      }

      if (res.status === 204) {
        localStorage.setItem("userDataToken", res.result.token);
        alert("User Login Successfully Done...");
        setData({ ...data, email: "", password: "" });
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1>Welcome to Login</h1>
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
          <button onClick={loginUser}>Login</button>
        </div>
        <br />
        <div className="form">
          <p>
            Have not a Account? <NavLink to={"/"}>Sign Up</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
