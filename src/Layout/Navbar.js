import React from "react";
import "./styles/navbar.scss"

const Navbar = ({ setToggle,toggleBtn }) => {
  return (
    <div className={`${toggleBtn ? "navbar" : "navbar collapse"}`}>
    <div className="brand">
      <div  className="hamburger" onClick={setToggle}>
        <div />
        <div />
        <div />
      </div>
      <div className="logo">
        <a style={{color: "#fdde6c", textTransform: "lowercase", paddingLeft: "2rem"}} href="#!">eventor</a>
      </div>
    </div>
    <div className="left">
      <i style={{color: "#fdde6c"}}  className="fas fa-sign-out-alt" />
    </div>
  </div>
  );
};
export default Navbar;
