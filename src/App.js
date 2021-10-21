import "./App.css";
import useToken from "./Hooks/useToken";

import LandingPage from "./Pages/Landing_page";
import NavbarComponent from "./Components/Navbar";
import FooterComponent from "./Components/Footer";

import React from "react";
import {Switch, Route, Redirect, Link} from "react-router-dom";

function App() {
  const {token, setToken} = useToken();

  return (
    <>
      <NavbarComponent />
      {!token ? <LandingPage setToken={setToken} /> :
        <div className="app-styles">
          <Switch>
            <Route exact path="/" render={(routeProps) => <LandingPage {...routeProps} />} />
          </Switch>
        </div>
      }
     <FooterComponent />
    </>
  );
};

export default App;

