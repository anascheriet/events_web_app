import React from "react";
import { Menu, Dropdown } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/actions/Users/logoutAction"
import { Link, useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
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
        <Link to="/EditProfile">
          <a target="_blank" className="menuLink" style={{ color: "#fdde6c" }} >
            <Icon name="user" style={{ color: "#fdde6c" }} />
              Profile
            </a>
        </Link>
      </Menu.Item>
      {user !== null && user.role.name === "Client"
        && <Menu.Item>
          <Link to="/MyBookings" style={{ color: "#fdde6c" }}>
            <Icon name="ticket alternate" style={{ color: "#fdde6c" }} />
            My Bookings
          </Link>
        </Menu.Item>}
      <Menu.Item >
        <a onClick={logOut} className="menuLink" target="_blank" style={{ color: "#fdde6c" }} >
          <Icon name="sign out" style={{ color: "#fdde6c" }} />
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
          <Link to="/Home">
            <p style={{ color: "#fdde6c", textTransform: "lowercase", paddingLeft: "2rem", fontSize: "25px" }} href="#!">eventor</p>
          </Link>

        </div>
      </div>

      {user !== null &&
        <Dropdown overlay={menu}>
          <div className="left">
            <Icon name="arrow down" style={{ color: "#fdde6c" }} />
          </div>
        </Dropdown>}

      {user === null &&
        <Link to="/">
          <div className="left">
            <i style={{ color: "#fdde6c" }} className="fas fa-arrow-right" />
          </div>
        </Link>
      }
    </div>
  );
};


export default Navbar;
