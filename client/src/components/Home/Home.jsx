import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { ContextNavigate } from "../ContextProvider/Context";

const Home = () => {
  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);
  const [profileImage, setProfileImage] = useState(null);

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



  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };



  return (
    <>
      <div className="contact">
        <div className="nametag">
          {userdata ? (
            <h3>
              Hello, My name is <span>{userdata.userData.name}</span>
            </h3>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
        <div className="nametag">
          <h3>
            I' m a <span>Full Stack Developer</span>
          </h3>
        </div>
        <div className="nametag">
          <h5>I'm a website design, graphic design, and many more...</h5>
        </div>
        <div className="nametag">
          <button className="btn btn-danger">Download CV</button>
        </div>
      </div>
      <div className="img">
        <div className="imgOrg">
          <img
            src={profileImage || "https://soorajsin.github.io/newcontactresume.github.io/image/simple%20photo%20sooraj.jpg"}
            alt="Profile"
          />
        </div>
        <div className="edit">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      </div>
    </>
  );
};

export default Home;
