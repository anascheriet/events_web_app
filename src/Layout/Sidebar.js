import React from "react";
import { Link } from "react-router-dom";

const nav = [
  { text: "Dashboard", link: "#!", icon: "chart-line", active: true },
  { text: "Events", link: "#!", icon: "calendar-alt" },
  { text: "EventTypes", link: "#!", icon: "list-alt" },
];

const Sidebar = ({ toggleBtn }) => {
  return (

    <div
      className={`${toggleBtn ? "sidebar collapse" : "sidebar"}`}
      data-simplebar
    >
      <ul>
        {nav.map(item => (
          <li key={item.text}>
            <Link className={item.active ? "active" : ""} key={item.text} to={item.text === "Dashboard" ? "/Home" : `/${item.text}`}>
              <span className="icon">
                <i className={`fas fa-${item.icon}`} />
              </span>
              <span className="title">{item.text}</span>
            </Link>
          </li>
        ))}

      </ul>
    </div>
  );
};
export default Sidebar;
