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
        <Link to="/EditProfile" className="menuLink">
          <p style={{ color: "#fdde6c" }} >
            <Icon name="user" style={{ color: "#fdde6c" }} />
              Profile
            </p>
        </Link>
      </Menu.Item>
      {user !== null && user.role.name === "Client"
        &&
        <Menu.Item className="menuLink">
          <Link to="/MyBookings" className="menuLink">
            <p style={{ color: "#fdde6c" }} >
              <Icon name="ticket alternate" style={{ color: "#fdde6c" }} />
          My Bookings
            </p>
          </Link>
        </Menu.Item>}
      <Menu.Item >
        <Link to="/" className="menuLink">
          <p onClick={logOut}  style={{ color: "#fdde6c" }} >
            <Icon name="sign out" style={{ color: "#fdde6c" }} />
              Log out
            </p>
        </Link>
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
            <i className="fas fa-arrow-right" style={{ color: "#fdde6c" }} />
          </div>
        </Link>
      }
    </div>
  );
};


export default Navbar;
