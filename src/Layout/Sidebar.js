import React from "react";
import { Link } from "react-router-dom";

const nav = [
  { text: "Dashboard", link: "#!", icon: "chart-line", active: true },
  { text: "Events", link: "#!", icon: "calendar-alt" },
  { text: "Bookings", link: "#!", icon: "ticket-alt" },
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
          <Link to={`/${item.text}`}>
            <li key={item.text}>
              <a href="#!" className={item.active ? "active" : ""}>
                <span className="icon">
                  <i className={`fas fa-${item.icon}`} />
                </span>
                <span className="title">{item.text}</span>
              </a>
            </li>
          </Link>
        ))}

      </ul>
    </div>
  );
};
export default Sidebar;
