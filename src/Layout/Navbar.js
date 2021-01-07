import React from "react";

const Navbar = ({ setToggle }) => {
  return (
    <div className="navbar">
      <div className="brand">
        <div className="hamburger" onClick={setToggle}>
          <div />
          <div />
          <div />
        </div>
        <div className="logo">
          <a href="#!">App Logo</a>
        </div>
      </div>
      <div className="left">
        <i className="fas fa-sign-out-alt" />
      </div>
    </div>
  );
};
export default Navbar;
