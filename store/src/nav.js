import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import "./nav.css";
import Tabs from "./tabs.js";
import File from "./file.js";
import "bootstrap/dist/css/bootstrap.min.css";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disp: { display: "none" },
      disp1: { opacity: "1" },
      disp2: { display: "block" },
      tog: true,
    };
  }
  show = (a) => {
    ReactDOM.render(<Tabs page={a} />, document.getElementById("root"));
  };
  open = () => {
    this.setState({ tog: !this.state.tog });
    this.state.tog
      ? this.setState({
          disp2: { display: "none" },
          disp: { display: "block" },
          disp1: { opacity: "0.9" },
        })
      : this.setState({
          disp2: { display: "block" },
          disp: { display: "none" },
          disp1: { opacity: "1" },
        });
  };
  render() {
    return (
      <div className="cont">
        <header className="bg-dark" style={this.state.disp1}>
          <h1 className="text-white pr-5 mr-5" style={this.state.disp2}>
            Nav
          </h1>
          <nav style={this.state.disp}>
            <ul>
              <li>
                <button onClick={() => this.show(6)}>Find</button>
              </li>
              <li>
                <button onClick={() => this.show(1)}>New Job</button>
              </li>
              <li>
                <button onClick={() => this.show(5)}>Find Client</button>
              </li>
              <li>
                <button onClick={() => this.show(2)}>New Detail </button>
              </li>
              <li>
                <button onClick={() => this.show(9)}>Remove Job</button>
              </li>
              <li>
                <button onClick={() => this.show(3)}>New Position</button>
              </li>
              <li>
                <button onClick={() => this.show(10)}>Remove Client</button>
              </li>
              <li>
                <button onClick={() => this.show(4)}>Checkout ID</button>
              </li>
              <li>
                <button onClick={() => this.show(7)}>
                  Find Positioned Details
                </button>
              </li>
              <li>
                <button onClick={() => this.show(8)}>
                  Find Positioned Client Container
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <div className="left0 bg-dark"></div>
          <div
            id="pic"
            className="mid0 bg-light mx-auto"
            style={(this.state.disp1, { height: "calc(100vh - 288px)" })}
          ></div>
          <div className="right0 bg-dark">
            <div
              className="buu float-right"
              style={this.state.disp1}
              onClick={this.open}
            >
              <div className="bur"></div>
              <div className="bur"></div>
              <div className="bur"></div>
            </div>
          </div>
        </main>
        <footer className="bg-dark">
          <button
            className="btn btn-light btn-block"
            onClick={() =>
              ReactDOM.render(<File />, document.getElementById("root"))
            }
          >
            {" "}
            Files{" "}
          </button>
        </footer>
      </div>
    );
  }
}

export default Nav;
