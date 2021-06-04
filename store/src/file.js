import ReactDOM from "react-dom";
import React from "react";
import "./index.css";

import Nav from "./nav.js";
import Iframe from "react-iframe";
import "bootstrap/dist/css/bootstrap.min.css";

class File extends React.Component {
  open = () => {
    ReactDOM.render(<Nav />, document.getElementById("root"));
  };
  render() {
    return (
      <div className="cont">
        <header className="bg-dark">
          <h1 className="text-white pr-5 mr-5">Files</h1>
        </header>
        <main>
          <div className="left0 bg-dark"></div>
          <div
            className="mid0 bg-light mx-auto"
            style={{ height: "calc(100vh - 288px)" }}
          >
            <Iframe
              url="https:///fs"
              width="100%"
              height="100%"
              display="initial"
              position="relative"
            />
          </div>
          <div className="right0 bg-dark">
            <div className="buu float-right" onClick={this.open}>
              <div className="bur"></div>
              <div className="bur"></div>
              <div className="bur"></div>
            </div>
          </div>
        </main>
        <footer className="bg-dark"></footer>
      </div>
    );
  }
}

export default File;
