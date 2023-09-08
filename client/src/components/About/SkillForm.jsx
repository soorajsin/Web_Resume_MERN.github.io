import React, { useState } from "react";
import "./SkillForm.css";

const SkillForm = () => {
  const [skills, setSkills] = useState([""]);

  const addSkillInput = () => {
    setSkills([...skills, ""]);
  };
  console.log(skills);

  const skillOnChange = (index, value) => {
    const updatSkills = [...skills];
    updatSkills[index] = value;
    setSkills(updatSkills);
  };

  const submitButtonSave = async (e) => {
    e.preventDefault();

    if (skills.some((skill) => skill === "")) {
      alert("Please fill all skill fields");
      return;
    } else {
      console.log("save");

      const data = await fetch("http://localhost:4000/skillAdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills,
        }),
      });

      const res = await data.json();
      console.log(res);
    }
  };

  return (
    <>
      <div className="skill">
        <h1>Add Skill here...</h1>
        <div className="form">
          {skills.map((skills, index) => (
            <div key={index}>
              <input
                type="text"
                name="skill"
                value={skills.skill}
                onChange={(e) => skillOnChange(index, e.target.value)}
                placeholder="Enter skill here..."
              />
            </div>
          ))}
          <button onClick={addSkillInput} className="btn btn-primary">
            Add Skill
          </button>
        </div>
        <div className="submit">
          <button onClick={submitButtonSave} className="btn btn-success">
            Save Skill
          </button>
        </div>
      </div>
    </>
  );
};

export default SkillForm;
