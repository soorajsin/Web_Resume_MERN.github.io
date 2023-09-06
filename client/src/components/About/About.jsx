import React, { useContext, useEffect, useState } from "react";
import "./About.css";
import { ContextNavigate } from "../ContextProvider/Context";

const About = () => {
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
    }
  };

  useEffect(() => {
    DashboardDatafetch();
  });

  //skill part
  // Skill part
  const [skills, setSkills] = useState([""]);

  // Function to add a new input field for skills
  const addSkillField = () => {
    setSkills([...skills, ""]);
  };

  // Function to handle changes in skill values
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };
  // console.log(skills);


  const saveSkill=(e)=>{
    e.preventDefault();
    console.log("save");


  }

  return (
    <>
      <div className="contact">
        <div className="tag">
          {userdata ? (
            <h3>
              Hello, My name is <span>{userdata.userData.name}</span> and{" "}
              <span>Full Developer</span>
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
        <div className="skill">
          <div className="skillClass">
            {skills.map((skill, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Enter Skill here..."
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                />
              </div>
            ))}
            <button onClick={addSkillField} className="btn btn-primary">Add Skill</button><br/>
            <button onClick={saveSkill}  className="btn btn-success" >Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
