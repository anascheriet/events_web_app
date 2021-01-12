import React from "react";
import { useSelector } from "react-redux";
import "./styles/sidebar.scss"




const Sidebar = ({ toggleBtn, setToggle }) => {

  const { user } = useSelector(state => state.userState);


  const nav = [
    { text: "Dashboard", link: "#!", icon: "chart-line", active: true },
    { text: "Events", link: "#!", icon: "calendar-week" },
    { text: "Bookings", link: "#!", icon: "ticket-alt" },
  ];


  return (

    <div
      className={`${toggleBtn ? "sidebar collapse" : "sidebar"}`}
      style={{ marginTop: "0rem" }}
      data-simplebar
    >
      <ul>
        <div className="brand">
          <div className="hamburger" onClick={setToggle}>
            <div />
            <div />
            <div />
          </div>
        </div>

        {nav.map(item => (
          <li key={item.text}>
            <a href="#!" className={item.active ? "active" : ""}>
              <span className="icon">
                <i className={`fas fa-${item.icon}`} />
              </span>
              <span className="title">{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Sidebar;
