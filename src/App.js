import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Welcome from "./Welcome";
import Secured from "./Secured";
import Login from "./Login";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <ul>
            <li>
              <Link to="/">public component</Link>
            </li>
            <li>
              <Link to="/secured">secured component</Link>
            </li>
            <br />
            <br />
          </ul>
          <Route exact path="/" component={Welcome} />
          <Route path="/secured" component={Secured} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
