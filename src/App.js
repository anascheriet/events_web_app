import React, { Fragment, useState } from "react";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Content from "./Layout/Content";
import "semantic-ui-css/semantic.min.css";
import "./styles.scss";
import { EventsDashboard } from "./Components/events/Admin/EventsDashboard"
import { useSelector } from "react-redux";
import { Login } from "./Components/auth/Login";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { EventTypes } from "./Components/events/Admin/EventTypes";
import { EventsHome } from "./Components/events/Client/EventsHome"

function App() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn(val => !val);

  const { token, user } = useSelector(state => state.userState);

  const isAdmin = token !== null && user?.role?.name !== "Client";

  return (
    <div >
      <Router>
        <ToastContainer />
        {token === null ?
          <Route exact path="/" component={Login} />
          :
          <>
            <Navbar setToggle={toggle} />
            {token !== null && isAdmin ? <>
              <Sidebar toggleBtn={toggleBtn} />
              <Content toggleBtn={toggleBtn}>
                <Switch>
                  <Route exact path="/Events" component={EventsDashboard} />
                  <Route exact path="/EventTypes" component={EventTypes} />
                </Switch>
              </Content></>
              :
              <Fragment style>
                <div style={{ marginTop: "5rem", marginLeft: "2rem" }}>
                  <Switch>
                    <Route exact path={["/Events/:id", "/Events"]} component={EventsHome} />
                  </Switch>
                </div>
              </Fragment>

            }

          </>
        }



        {/*     <Navbar setToggle={toggle} toggleBtn={toggleBtn} />
        <Sidebar setToggle={toggle} toggleBtn={toggleBtn} />
        <Content toggleBtn={toggleBtn}>

          {user.role.name === "SuperAdmin" ? <EventsDashboard /> : <HHHHH />}
        </Content> */}
      </Router>

    </div >
  );
}

export default App;