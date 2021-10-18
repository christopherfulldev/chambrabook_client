import "./App.css";

import React from "react";
import {Switch, Route, Redirect, Link} from "react-router-dom";
import NavbarComponent from "./Components/Navbar";
import FooterComponent from "./Components/Footer";

import LandingPage from "./Pages/Landing_page/LandingPage";





function App() {
  return (
    <div className="app-styles">
    <NavbarComponent/>
    <Switch>
    
    </Switch>
    <FooterComponent/>
    </div>
  );
};

export default App;

