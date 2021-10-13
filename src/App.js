import React from "react";
import {Switch, Route, Redirect, Link} from react-router-dom;
import "./App.css";


function App() {
  return (
    <div className="app-styles">
    <Switch>
      <LoginComponent/>
    </Switch>
    </div>
  );
}

export default App;

