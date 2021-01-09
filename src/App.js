import React, { useEffect, useState } from "react";
import "simplebar";
import "./app.scss"
import { loadUser } from "./redux/actions/userAction";
import { useDispatch } from "react-redux";
import { Login } from "./Components/auth/Login";

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
      {/* <Navbar setToggle={toggle} toggleBtn={toggleBtn} />
      <Sidebar toggleBtn={toggleBtn} setToggle={toggle} />
      <Content toggleBtn={toggleBtn}>
      </Content> */}
      <Login />
    </div>
  );
}
export default App;