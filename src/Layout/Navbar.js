import React from "react";
import { useDispatch } from "react-redux";
import "./styles/navbar.scss"
import { logoutAction } from "../redux/actions/logoutAction"

const Navbar = ({ setToggle, toggleBtn }) => {

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logoutAction());
  }
  return (
    <div className={`${toggleBtn ? "navbar" : "navbar collapse"}`}>
      <div className="brand">
        <div className="hamburger" onClick={setToggle}>
          <div />
          <div />
          <div />
        </div>
        <div className="logo">
          <a style={{ color: "#fdde6c", textTransform: "lowercase", paddingLeft: "2rem" }} href="#!">eventor</a>
        </div>
      </div>
      <div className="left" onClick={logOut}>
        <i style={{ color: "#fdde6c" }} className="fas fa-sign-out-alt" />
      </div>
    </div>
  );
};
export default Navbar;
