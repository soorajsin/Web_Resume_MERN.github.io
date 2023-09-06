import React, { useContext, useEffect } from "react";
import "./Home.css";
import { ContextNavigate } from "../ContextProvider/Context";

const Home = () => {
  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

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

  return (
    <>
      <div className="contact">
        {userdata ? (
          <h3>
            Hello, My name is <span>{userdata.userData.name}</span>
          </h3>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </>
  );
};

export default Home;
