import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextNavigate } from "./ContextProvider/Context";
// import { ContextNavigate } from "./ContextProvider/Context";

const Dashboard = () => {
  //add context
  const { userdata, setUserData } = useContext(ContextNavigate);
  //   console.log(userdata);

  const history = useNavigate();

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
    //     console.log(res);

    if (res.status === 200) {
      //   console.log(res);
      setUserData(res);
            // history("/dash");
    } else {
      console.log("User Not Authorised");
      history("/");
    }
  };

  useEffect(() => {
    DashboardDatafetch();
  });

  return (
    <>
      <div className="dash text-center"  style={{marginTop:"120px"}}>
        <h1>Welcome to Dashboard</h1>
        <br />
        {userdata ? (
          <div className="content" style={{ color: "red" }}>
            <h1>User Email id : {userdata.userData.email}</h1>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Dashboard;
