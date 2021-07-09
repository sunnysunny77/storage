import React from "react";
import Iframe from "react-iframe";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class File extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  open = () => {
    this.setState({
      redirect: {
        pathname: "/",
      },
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="cont">
        <header className="bg-dark">
          <h1 className="text-white pr-5 mr-5">Files</h1>
        </header>
        <main>
          <div className="left0 bg-dark"></div>
          <div
            className="mid0 midy bg-light mx-auto"
          >
            <Iframe
              url="https://storage.sunnyhome.site/fs"
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
