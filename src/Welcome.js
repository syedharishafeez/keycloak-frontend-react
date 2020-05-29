import React, { Component } from "react";
import axios from "axios";

class Welcome extends Component {
  state = {
    showMessage: null,
  };
  componentDidMount() {
    axios
      .get(`http://localhost:4000/public-backend`)
      .then((res) => {
        console.log("res = ", res);
        this.setState({ showMessage: res.data.message });
      })
      .catch((ex) => console.log("ex = ", ex));
  }

  render() {
    return (
      <div className="Welcome">
        <p> {this.state.showMessage} </p>
      </div>
    );
  }
}
export default Welcome;
