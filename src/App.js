import React, {useState } from "react";
import "simplebar";
import "./app.scss"
import { useSelector } from "react-redux";
import { Login } from "./Components/auth/Login";
import Navbar from "./Layout/Navbar"
import Sidebar from "./Layout/Sidebar"
import Content from "./Layout/Content"

function App() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn(!toggleBtn);

  //check if token exists
  const { token } = useSelector(state => state.userState);

  return (
    <div >
      {/* <Navbar setToggle={toggle} toggleBtn={toggleBtn} />
      <Sidebar toggleBtn={toggleBtn} setToggle={toggle} />
      <Content toggleBtn={toggleBtn}>
      </Content> */}
      { !token ? (
        <Login />
      ) : (
          <>
            <Navbar setToggle={toggle} toggleBtn={toggleBtn} />
            <Sidebar toggleBtn={toggleBtn} setToggle={toggle} />
            <Content toggleBtn={toggleBtn}>
            </Content>
          </>
        )
      }
    </div>
  );
}
export default App;