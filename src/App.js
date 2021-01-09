import React, { useEffect, useState } from "react";
import "simplebar";
import "./app.scss"
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Content from "./Layout/Content";
import { Button } from "antd";
import { loadUser } from "./redux/actions/userAction";
import axios from "axios";
import { userDataUrl } from "./redux/api";
import { useDispatch } from "react-redux";

function App() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn(!toggleBtn);

  //need a dispatcher that executes the action !!!!!!!!!!:D
  const dispatch = useDispatch();

  const user = {
    username: "anas@live.fr",
    password: "anas"
  }

  useEffect(() => {
    dispatch(loadUser(user));
  }, [])

  return (
    <div >
      <Navbar setToggle={toggle} toggleBtn={toggleBtn} />
      <Sidebar toggleBtn={toggleBtn} setToggle={toggle} />
      <Content toggleBtn={toggleBtn}>
      </Content>
    </div>
  );
}
export default App;