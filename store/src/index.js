import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./home";
import Nav from "./nav";
import Files from "./file";
import Store from "./store";
import { io } from "socket.io-client";
import axios from "axios";
import jwt from "jsonwebtoken";
import "./index.css";

function Index() {
  const [token, setToken] = useState(false);
  axios("/tok", {
    method: "post",
    withCredentials: true,
  })
    .then((res) => {
      if (res.data) {
        let use = jwt.verify(res.data, process.env.REACT_APP_JWT_SECRET);
        setToken(use.token);
      }
      if (!res.data) {
        setToken(res.data);
      }
    })
    .catch((error) => {
      alert(error);
    }
  );
  if (token !== process.env.REACT_APP_TOKEN_SECRET) {
    return <Home setToken={setToken} />;
  }
  const socket = io();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Nav} />
        <Route exact path="/files" component={Files} />
        <Route
          exact
          path="/store"
          render={(props) => <Store {...props} socket={socket} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
