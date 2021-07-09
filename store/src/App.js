import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./home";
import Nav from "./nav";
import Files from "./file";
import Store from "./store";
import { io } from "socket.io-client";

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  return sessionStorage.getItem("token");
}

function App() {
  const token = getToken();
  const socket = io();
  if (!token) {
    return <Home setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/" component={Nav} />

        <Route exact path="/files" component={Files} />

        <Route exact path="/store" render={(props) => <Store {...props} socket={socket} />}/>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
