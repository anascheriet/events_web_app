import React, { useState } from "react";
import "simplebar";
import "./app.scss"
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Content from "./Layout/Content";

function App() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn(val => !val);
  return (
    <div >
      <Navbar setToggle={toggle} toggleBtn={toggleBtn} />
      <Sidebar toggleBtn={toggleBtn} setToggle={toggle} />
      <Content toggleBtn={toggleBtn}>
        HHHHH
      </Content>
    </div>
  );
}
export default App;