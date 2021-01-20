import React, { useEffect, useState } from "react";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Content from "./Layout/Content";
import "semantic-ui-css/semantic.min.css";
import "./styles.scss";
import { EventsDashboard } from "./Components/events/EventsDashboard"
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./Components/auth/Login";
import { ToastContainer } from "react-toastify";
import { HHHHH } from "./Components/events/HHHHH";
import { loadUserInfo } from "./redux/actions/Users/loadUserInfo";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn(val => !val);

  const { token, user } = useSelector(state => state.userState);
  const dispatch = useDispatch();

  const isAdmin = token !== null && user?.role?.name !== "Client";

  return (
    <div >
      <BrowserRouter>
        <ToastContainer />
        {token === null ?
          <Route exact path="/" component={Login} />
          :
          <>
            {isAdmin && <Sidebar toggleBtn={toggleBtn}  />}
            <Navbar setToggle={toggle} toggleBtn={toggleBtn} />
          </>
        }
        <Switch>

        </Switch>


        {/*     <Navbar setToggle={toggle} toggleBtn={toggleBtn} />
        <Sidebar setToggle={toggle} toggleBtn={toggleBtn} />
        <Content toggleBtn={toggleBtn}>

          {user.role.name === "SuperAdmin" ? <EventsDashboard /> : <HHHHH />}
        </Content> */}
      </BrowserRouter>

    </div>
  );
}

export default App;