import React from "react";

const nav = [
  { text: "Home", link: "#!", icon: "home" },
  { text: "About", link: "#!", icon: "box" },
  { text: "Movies", link: "#!", icon: "tv", active: true },
  { text: "Contacts", link: "#!", icon: "user" },
  { text: "Bobliothèque", link: "#!", icon: "book" },
  { text: "Cartographie", link: "#!", icon: "map-signs" },
  { text: "Nature", link: "#!", icon: "leaf" }
];

const Sidebar = ({ toggleBtn }) => {
  return (
    <div
      className={`${toggleBtn ? "sidebar collapse" : "sidebar"}`}
      style={{marginTop: "0rem"}}
      data-simplebar
    >
      <ul>
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
};
export default Sidebar;
