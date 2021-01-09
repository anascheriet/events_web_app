import React from "react";
import "./styles/content.scss"
const Content = ({ toggleBtn, children }) => {
  return (
    <div
      className={`${toggleBtn ? "app-wrapper collapse" : "app-wrapper"}`}
      data-simplebar
    >
      {children}
    </div>
  );
};
export default Content;
