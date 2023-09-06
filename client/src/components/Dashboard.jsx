import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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
      console.log(res);
      //       history("/dash");
    } else {
      console.log("User Not Authorised");
      history("*");
    }
  };

  useEffect(() => {
    DashboardDatafetch();
  });

  return (
    <>
      <div className="dash">
        <h1>Welcome to Dashboard</h1>
        <br />
        User id:{}
      </div>
    </>
  );
};

export default Dashboard;
