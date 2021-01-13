import React from "react";
import { Menu, Dropdown } from 'antd';
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/logoutAction"
const Navbar = ({ setToggle, toggleBtn }) => {

    const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logoutAction());
  }

    const menu = (
        <Menu style={{backgroundColor: "#14213d"}}>
          <Menu.Item >
            <a target="_blank" className="menuLink" style={{color: "#fdde6c"}} >
              <i className="fas fa-user" style={{marginRight: "1rem"}}/>
              Profile
            </a>
          </Menu.Item>
          <Menu.Item >
            <a onClick={logOut} className="menuLink" target="_blank" style={{color: "#fdde6c"}} >
            <i className="fas fa-sign-out-alt" style={{marginRight: "1rem"}}/>
              Log out
            </a>
          </Menu.Item>
        </Menu>
      );
    
  return (
    <div className={`${toggleBtn ? "navbar" : "navbar collapse"}`}>
    <div className="brand">
      <div className="hamburger" onClick={setToggle}>
        <div />
        <div />
        <div />
      </div>
      <div className="logo">
        <a style={{ color: "#fdde6c", textTransform: "lowercase", paddingLeft: "2rem", fontSize:"25px" }} href="#!">eventor</a>
      </div>
    </div>

    <Dropdown overlay={menu}>
      <div className="left">
        <i style={{ color: "#fdde6c" }}  className="fas fa-chevron-down" />
      </div>
    </Dropdown>

  </div>
  );
};
export default Navbar;
