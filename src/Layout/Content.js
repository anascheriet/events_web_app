import React from "react";
const Content = ({ toggleBtn, children }) => {
  return (
    <div
      className={`${toggleBtn ? "app-wrapper collapse" : "app-wrapper"}`}
      data-simplebar
    >
      <div>
        {children}
      </div>
    </div>
  );
};

export default Content;
