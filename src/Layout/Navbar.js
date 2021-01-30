import React from "react";
import { Menu, Dropdown } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/actions/Users/logoutAction"
import { Link, useHistory } from "react-router-dom";
const Navbar = ({ setToggle }) => {

  const dispatch = useDispatch();

  const { token, user } = useSelector(state => state.userState);

  const history = useHistory();


  const isAdmin = token !== null && user?.role?.name !== "Client";



  const logOut = () => {
    dispatch(logoutAction());
    history.push("/");
  }

  const menu = (
    <Menu style={{ backgroundColor: "#14213d" }}>
      <Menu.Item >
        <a target="_blank" className="menuLink" style={{ color: "#fdde6c" }} >
          <i className="fas fa-user" style={{ marginRight: "1rem" }} />
              Profile
            </a>
      </Menu.Item>
      <Menu.Item >
        <a onClick={logOut} className="menuLink" target="_blank" style={{ color: "#fdde6c" }} >
          <i className="fas fa-sign-out-alt" style={{ marginRight: "1rem" }} />
              Log out
            </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="brand">
        {isAdmin && <div className="hamburger" onClick={setToggle}>
          <div />
          <div />
          <div />
        </div>}

        <div className="logo">
          <a style={{ color: "#fdde6c", textTransform: "lowercase", paddingLeft: "2rem", fontSize: "25px" }} href="#!">eventor</a>
        </div>
      </div>

      {user !== null &&
        <Dropdown overlay={menu}>
          <div className="left">
            <i style={{ color: "#fdde6c" }} className="fas fa-chevron-down" />
          </div>
        </Dropdown>}

      {user === null &&
        <Link to="/">
          <div className="left">
            <i style={{ color: "#fdde6c" }} className="fas fa-arrow-right"></i>
          </div>
        </Link>
      }
    </div>
  );
};


export default Navbar;
