import React, { useState } from "react";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
import ReactDOM from "react-dom";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Content from "./Layout/Content";
import MessageExampleAttached from "./Layout/exemple";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";

function App() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn(val => !val);
  return (
    <div >
      <Navbar setToggle={toggle} />
      <Sidebar toggleBtn={toggleBtn} />
     
    </div>
  );
}

export default App;
