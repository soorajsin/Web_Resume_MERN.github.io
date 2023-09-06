import React, { useEffect } from "react";

const Dashboard = () => {
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
    } else {
      console.log("User Not Authorised");
    }
  };

  useEffect(() => {
    DashboardDatafetch();
  });

  return <div>Dashboard</div>;
};

export default Dashboard;
