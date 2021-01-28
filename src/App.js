import React, { Fragment, useState } from "react";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Content from "./Layout/Content";
import ClientContent from "./Layout/ClientContent";
import "semantic-ui-css/semantic.min.css";
import "./layout.scss";
import "./styles.scss";
import { EventsDashboard } from "./Components/events/Admin/EventsDashboard"
import { useSelector } from "react-redux";
import { Login } from "./Components/auth/Login";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { EventTypes } from "./Components/events/Admin/EventTypes";
import { EventsHome } from "./Components/events/Client/EventsHome"
import { Dashboard } from "./Components/events/Admin/Dashboard";
import { Redirect } from "./Components/Redirect";

function App() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const toggle = () => setToggleBtn(val => !val);

  const { token, user } = useSelector(state => state.userState);

  const isAdmin = user?.role?.name !== "Client";

  return (
    <div >
      <Router>
        <ToastContainer />
        <Route exact path="/" component={Login} />
        <Route exact path={["/Guest", "/Guest/:id"]} component={EventsHome} />
        <Route path={'/(.+)'}
          render={() => (
            <Fragment>
              <Navbar setToggle={toggle} />
              <Route exact path="/Redirect" component={Redirect} />
              {isAdmin && user !== null ? <>
                <Sidebar toggleBtn={toggleBtn} />
                <Content toggleBtn={toggleBtn}>
                  <Switch>
                    <Route exact path="/Home" component={Dashboard} />
                    <Route exact path="/Events" component={EventsDashboard} />
                    <Route exact path="/EventTypes" component={EventTypes} />
                  </Switch>
                </Content></>
                :
                user !== null &&
                <div >
                  <div style={{ marginTop: "5rem", marginLeft: "2rem" }}>
                    <ClientContent>
                      <Switch>
                        <Route exact path="/Home" component={EventsHome} />
                        <Route exact path={["/Home", "/Home/:id"]} component={EventsHome} />
                      </Switch>
                    </ClientContent>

                  </div>
                </div>
              }
            </Fragment>


          )} />

      </Router>

    </div >
  );
}

export default App;