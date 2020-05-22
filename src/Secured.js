import React, { Component } from "react";
import Keycloak from "keycloak-js";
import axios from "axios";

class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false, showMessage: null };
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak
      .init({
        onLoad: "login-required",
      })
      .then((authenticated) => {
        this.setState({ keycloak: keycloak, authenticated: authenticated });
      });
  }

  render() {
    console.log("keycloak = ", this.state.keycloak);
    console.log("authenticated = ", this.state.authenticated);
    if (this.state.keycloak) {
      if (this.state.authenticated)
        return (
          <div>
            <p>
              This is a Keycloak-secured component of your application. You
              shouldn't be able to see this unless you've authenticated with
              Keycloak.
            </p>
            <button
              onClick={() => {
                axios
                  .get(`http://localhost:4000/public-backend`)
                  .then((res) => {
                    console.log("res = ", res);
                    this.setState({ showMessage: res.data.message });
                  })
                  .catch((ex) => console.log("ex = ", ex));
              }}
            >
              Call Public Backend
            </button>
            <button
              onClick={() => {
                axios
                  .get(`http://localhost:4000/secured-backend`, {
                    headers: {
                      Authorization: "Bearer " + this.state.keycloak.token, //the token is a variable which holds the token
                    },
                  })
                  .then((res) => {
                    console.log("res = ", res);
                    this.setState({ showMessage: res.data.message });
                  })
                  .catch((ex) => console.log("ex = ", ex));
              }}
            >
              Call Secured Backend
            </button>
            <br />
            <p>{this.state.showMessage}</p>
          </div>
        );
      else return <div>Unable to authenticate!</div>;
    }
    return <div>Initializing Keycloak...</div>;
  }
}
export default Secured;
