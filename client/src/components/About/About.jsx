import React, { useContext, useEffect } from "react";
import "./About.css";
import { ContextNavigate } from "../ContextProvider/Context";
import { NavLink, useNavigate } from "react-router-dom";

const About = () => {
  const history = useNavigate();

  const { userdata, setUserData } = useContext(ContextNavigate);

  const DashboardDatafetch = async () => {
    const token = await localStorage.getItem("userDataToken");
    //     console.log(token);

    const data = await fetch("http://localhost:4000/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 200) {
      //   console.log(res);
      setUserData(res);
      //       history("/dash");
    } else {
      history("/");
    }
  };

  useEffect(() => {
    DashboardDatafetch();
  });

  return (
    <>
      <div className="contact">
        <div className="tag">
          {userdata ? (
            <h3>
              Hello, My name is <span>{userdata.userData.name}</span> and{" "}
              <span>Full Stack Developer</span>
            </h3>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
        <div className="tag">
          <p>
            Reliable and friendly individual who works hard to achieve his
            hoals. Adaptable quickly, and organized well. Interested in learning
            the latest web & software technologies quickly Able to work in teams
            as well as individually. My future goal is to become a senior
            full-stack developer
          </p>
        </div>
        <div className="tag">
          <div className="personalInfo">
            <p>
              BirthDay : <span>05/08/2002</span>
            </p>
            <div className="line"></div>
          </div>
          <div className="personalInfo">
            <p>
              BirthDay : <span>05/08/2002</span>
            </p>
            <div className="line"></div>
          </div>
        </div>
        <div className="skilled">
          <div className="skillClass">
            <h1>
              <span>Skills</span>
            </h1>
            <br />
            <NavLink to={"/skill"}>
              <button className="btn btn-primary">Add Skill here...</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
