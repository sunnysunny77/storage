import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./home";
import Nav from "./nav";
import Files from "./file";
import Store from "./store";

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  return sessionStorage.getItem("token");
}

function App() {
  const token = getToken();

  if (!token) {
    return <Home setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Nav} />

        <Route exact path="/files" component={Files} />

        <Route exact path="/Store" component={Store} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
