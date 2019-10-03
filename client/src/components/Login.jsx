import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    name: "",
    loggedIn: false,
    loading: true
  };

  componentDidMount() {
    axios.get("/api/current_user").then(res => {
      if (!res.data) {
        this.setState({
          loading: false
        });
        return;
      }
      const name = res.data.name;
      this.setState({
        name,
        loggedIn: true,
        loading: false
      });
    });
  }

  render() {
    const { loading, name, loggedIn } = this.state;

    const authStyles = {
      color: "#28a745",
      marginLeft: "auto",
      paddingRight: "36px"
    };

    if (loading) {
      return <span>Loading...</span>;
    }

    if (!loggedIn) {
      return (
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          <a href="/auth/google">Login </a>
        </button>
      );
    }
    return (
      <React.Fragment>
        <span style={authStyles}>Welcome {name}!</span>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          <a href="/api/logout">Logout </a>
        </button>
      </React.Fragment>
    );
  }
}

export default Login;
