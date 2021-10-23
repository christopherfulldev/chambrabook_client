import "./App.css";

import useToken from "./Hooks/useToken";

import ProfilePage from "./Pages/Profile_page";
import LandingPage from "./Pages/Landing_page";
import NavbarComponent from "./Components/Navbar";
import FooterComponent from "./Components/Footer";

import React from "react";
import {Switch, Route, Redirect, Link} from "react-router-dom";

function App() {
  const {token, setToken} = useToken();

  return (
    <>
    <NavbarComponent/>
        <div className="app-styles">
          <Switch>
          <Route exact path="/profile" render={(routeProps) => <ProfilePage {...routeProps} useToken={useToken} />} />
          <Route exact path="/" render={(routeProps) => <LandingPage {...routeProps} useToken={useToken} />} />
          </Switch>
        </div>
     <FooterComponent />
    </>
  );
};

export default App;

