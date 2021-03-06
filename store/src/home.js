﻿import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Alertb from "./boot.js";
import jwt from "jsonwebtoken";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: null,
      psw: null,
      disp: { display: "none" },
      disp1: { display: "block" },
    };
  }
  log = () => {
    window.event.preventDefault();
    let s = { user: this.state.uname, psw: this.state.psw };
    axios
      .post(`/post0`, s, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          let use = jwt.verify(res.data, process.env.REACT_APP_JWT_SECRET);
          this.props.setToken(use.token);
        }
        if (!res.data) {
          this.setState({
            disp: { display: "block", height: "117px" },
            disp1: { display: "none" },
          });
          setTimeout(() => {
            this.setState({
              disp: { display: "none" },
              disp1: { display: "block" },
            });
          }, 1500);
        }
      })
      .catch((error) => {
        alert(error);
      }
    );
  };
  change = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  render() {
    return (
      <div className="cont">
        <header className="bg-dark">
          <h1 className="text-white mr-4 pr-2 ">Storage</h1>
        </header>
        <main>
          <div className="left0 bg-dark"></div>
          <div
            className="mid0 bg-light mx-auto"
            style={{ padding: "calc(50vh - 202px) 0" }}
          >
            <div className="text-center" style={this.state.disp}>
              <Alertb alert="Incorrect Credentials" />
            </div>
            <div style={this.state.disp1}>
              <form id="f" onSubmit={this.log}>
                <input
                  type="text"
                  id="form1"
                  className="form-control text-center"
                  placeholder="Enter Username"
                  name="uname"
                  required
                  onChange={this.change}
                ></input>
                <input
                  type="password"
                  id="form2"
                  className="form-control text-center"
                  placeholder="Enter Password"
                  name="psw"
                  required
                  onChange={this.change}
                ></input>
                <button
                  id="form3"
                  type="submit"
                  className="btn btn-light btn-block"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="right0 bg-dark"></div>
        </main>
        <footer className="bg-dark"></footer>
      </div>
    );
  }
}

export default Home;
