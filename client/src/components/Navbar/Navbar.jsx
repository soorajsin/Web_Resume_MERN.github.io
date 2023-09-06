import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className="button">
            <button className="btn btn-primary">
              <NavLink className={"btn-navlink"} to={"/home"}>
                Home
              </NavLink>
            </button>
          </div>
          <div className="button">
            <button className="btn btn-primary">
              <NavLink className={"btn-navlink"} to={"/about"}>
                About
              </NavLink>
            </button>
          </div>
          <div className="button">
            <button className="btn btn-primary">
              <NavLink className={"btn-navlink"} to={"/service"}>
                Service
              </NavLink>
            </button>
          </div>
          <div className="button">
            <button className="btn btn-primary">
              <NavLink className={"btn-navlink"} to={"/portfolio"}>
                Portfolio
              </NavLink>
            </button>
          </div>
          <div className="button">
            <button className="btn btn-primary">
              <NavLink className={"btn-navlink"} to={"/contact"}>
                Contact
              </NavLink>
            </button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
