import React, { useState } from "react";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Content from "./Layout/Content";
import "semantic-ui-css/semantic.min.css";
import "./styles.scss";
import { EventsDashboard } from "./Components/events/EventsDashboard"
import { useSelector } from "react-redux";
import { Login } from "./Components/auth/Login";
import { ToastContainer } from "react-toastify";

function App() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn(val => !val);

  const { token } = useSelector(state => state.userState)
  return (
    <div >
      <ToastContainer />
      { token === null ? (
        <Login />
      ) : (
          <>
            <Navbar setToggle={toggle} toggleBtn={toggleBtn} />
            <Sidebar setToggle={toggle} toggleBtn={toggleBtn} />
            <Content toggleBtn={toggleBtn}>
              <EventsDashboard />
            </Content></>)}
    </div>
  );
}

export default App;