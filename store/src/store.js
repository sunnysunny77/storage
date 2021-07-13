import React from "react";
import ReactDOM from "react-dom";
import Alertb from "./boot.js";
import { Redirect } from "react-router-dom";
import Modale from "./modals.js";
import { Button, ButtonGroup, Form, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ToolkitProvider, { ColumnToggle } from "react-bootstrap-table2-toolkit";
import { JsonToTable } from "react-json-to-table";
import column from "./columns.js";

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: null,
      insertJob: null,
      insertJobID: null,
      delJob: null,
      delClientName: null,
      descrip: null,
      sumc: null,
      cont: "Container = N/A",
      contt: "All",
      posi: "",
      posii: "",
      weight: null,
      disp: { display: "none" },
      disp0: { display: "none" },
      disp1: { display: "none" },
      disp2: { display: "none" },
      disp1p1: { display: "none" },
      disp1p11: { display: "none" },
      disp1p111: { display: "none" },
      disp1p1111: { display: "none" },
      disp1p11111: { display: "none" },
      disp1p111111: { display: "none" },
      displays: { display: "block" },
      locs: null,
      cout: false,
      jstb: [],
      products: [],
      redirect: false,
      socket: this.props.socket,
      page: "Find Client",
    };
  }
  rss = (p) => {
    this.setState({
      clientName: null,
      insertJob: null,
      insertJobID: null,
      delJob: null,
      delClientName: null,
      descrip: null,
      sumc: null,
      cont: "Container = N/A",
      contt: "All",
      posi: "",
      posii: "",
      weight: null,
      disp: { display: "none" },
      disp0: { display: "none" },
      disp1: { display: "none" },
      disp2: { display: "none" },
      disp1p1: { display: "none" },
      disp1p11: { display: "none" },
      disp1p111: { display: "none" },
      disp1p1111: { display: "none" },
      disp1p11111: { display: "none" },
      disp1p111111: { display: "none" },
      displays: { display: "block" },
      locs: null,
      cout: false,
      jstb: [],
      products: [],
      redirect: false,
      socket: this.props.socket,
      page: p,
    });
  };
  componentDidMount() {
    if (this.props.location.state?.page) {
      this.setState({ page: this.props.location.state.page });
    }
  }
  go = (x) => {
    if (x === "New Job & Client") {
      return (
        <React.Fragment>
          <p style={this.state.displays} className="text-center text-warning">
            <br />
            <br />
            <br />
            Outline: <br />
            Job Number: {this.state.insertJob} <br />
            Client Name: {this.state.clientName} <br />
          </p>
          <div style={this.state.disp1}>
            <JsonToTable json={[this.state.jstb]} />
          </div>
          <div style={this.state.disp1p1}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="Updated"
              data={this.state.products}
              columns={column.columns1}
            />
          </div>
        </React.Fragment>
      );
    }
    if (x === "New Detail") {
      return (
        <React.Fragment>
          <p style={this.state.displays} className="text-center text-warning">
            <br />
            <br />
            <br />
            Outline: <br />
            Job Number: {this.state.insertJob} <br />
            Description: {this.state.descrip} <br />
            Container: {this.state.cont} <br />
          </p>
          <div style={this.state.disp1}>
            <JsonToTable json={[this.state.jstb]} />
          </div>
          <div style={this.state.disp1p1}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="Updated"
              data={this.state.products}
              columns={column.columns2}
            />
          </div>
        </React.Fragment>
      );
    }
    if (x === "Positions") {
      return (
        <React.Fragment>
          <p style={this.state.displays} className="text-center text-warning">
            <br />
            <br />
            <br />
            Outline: <br />
            Insert ID: {this.state.insertJobID} <br />
            Position: {this.state.posi} <br />
            Weight: {this.state.weight} <br />
          </p>
          <div style={this.state.disp1}>
            <JsonToTable json={[this.state.jstb]} />
          </div>
          <div style={this.state.disp1p1}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="Updated"
              data={this.state.products}
              columns={column.columns3}
            />
          </div>
          <div style={this.state.disp1p111}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="Updated"
              data={this.state.products}
              columns={column.columns12}
            />
          </div>
          <div style={this.state.disp1p1111}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="Updated"
              data={this.state.products}
              columns={column.columns13}
            />
          </div>
          <div style={this.state.disp1p11111}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="Updated"
              data={this.state.products}
              columns={column.columns14}
            />
          </div>
          <div style={this.state.disp1p111111}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="Updated"
              data={this.state.products}
              columns={column.columns15}
            />
          </div>
        </React.Fragment>
      );
    }
    if (x === "Checkout ID") {
      return (
        <React.Fragment>
          <p style={this.state.displays} className="text-center text-warning">
            <br />
            <br />
            <br />
            Outline: <br />
            Insert ID: {this.state.insertJobID} <br />
          </p>
          <div style={this.state.disp1}>
            <JsonToTable json={[this.state.jstb]} />
          </div>
          <div style={this.state.disp1p1}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="Cked_Out"
              data={this.state.products}
              columns={column.columns4}
            />
          </div>
        </React.Fragment>
      );
    }
    if (x === "Find Client") {
      return (
        <React.Fragment>
          <p style={this.state.displays} className="text-center text-warning">
            <br />
            <br />
            <br />
            Outline: <br />
            Client Name: {this.state.clientName} <br />
          </p>
          <div style={this.state.disp1}>
            <JsonToTable json={[this.state.jstb]} />
          </div>
          <div style={this.state.disp1p1}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="jobNum"
              data={this.state.products}
              columns={column.columns5}
            />
          </div>
          <div style={this.state.disp1p11}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="jobNum"
              data={this.state.products}
              columns={column.columns11}
            />
          </div>
        </React.Fragment>
      );
    }
    if (x === "Find Job") {
      const { ToggleList } = ColumnToggle;
      return (
        <React.Fragment>
          <p style={this.state.displays} className="text-center text-warning">
            <br />
            <br />
            <br />
            Outline: <br />
            Job Number: {this.state.insertJob} <br />
            Option: {this.state.sumc} <br />
          </p>
          <div style={this.state.disp1}>
            <JsonToTable json={[this.state.jstb]} />
          </div>
          <div style={this.state.disp1p1}>
            <ToolkitProvider
              keyField="ID"
              data={this.state.products}
              columns={column.columns6}
              columnToggle
            >
              {(props) => (
                <div>
                  <ToggleList
                    contextual="warning"
                    className="list-custom-class btn-block"
                    btnClassName="list-btn-custom-class"
                    {...props.columnToggleProps}
                  />
                  <hr />
                  <BootstrapTable
                    headerClasses="header-class"
                    filter={column.filterFactory()}
                    {...props.baseProps}
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
        </React.Fragment>
      );
    }
    if (x === "Find Positioned Details") {
      const { ToggleList } = ColumnToggle;
      return (
        <React.Fragment>
          <p style={this.state.displays} className="text-center text-warning">
            <br />
            <br />
            <br />
            Outline: <br />
            Job Number: {this.state.insertJob} <br />
            Description: {this.state.descrip} <br />
          </p>
          <div style={this.state.disp1}>
            <JsonToTable json={[this.state.jstb]} />
          </div>
          <div style={this.state.disp1p1}>
            <ToolkitProvider
              keyField="ID"
              data={this.state.products}
              columns={column.columns7}
              columnToggle
            >
              {(props) => (
                <div>
                  <ToggleList
                    contextual="warning"
                    className="list-custom-class btn-block"
                    btnClassName="list-btn-custom-class"
                    {...props.columnToggleProps}
                  />
                  <hr />
                  <BootstrapTable
                    headerClasses="header-class"
                    {...props.baseProps}
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
        </React.Fragment>
      );
    }
    if (x === "Find Positioned Client") {
      return (
        <React.Fragment>
          <p style={this.state.displays} className="text-center text-warning">
            <br />
            <br />
            <br />
            Outline: <br />
            Client Name: {this.state.clientName} <br />
            Container: {this.state.cont} <br />
          </p>
          <div style={this.state.disp1}>
            <JsonToTable json={[this.state.jstb]} />
          </div>
          <div style={this.state.disp1p1}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="ID"
              data={this.state.products}
              columns={column.columns8}
            />
          </div>
        </React.Fragment>
      );
    }
    if (x === "Remove Job") {
      return (
        <React.Fragment>
          <p style={this.state.displays} className="text-center text-warning">
            <br />
            <br />
            <br />
            Outline: <br />
            Job Number: {this.state.delJob} <br />
          </p>
          <div style={this.state.disp1}>
            <JsonToTable json={[this.state.jstb]} />
          </div>
          <div style={this.state.disp1p1}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="Updated"
              data={this.state.products}
              columns={column.columns9}
            />
          </div>
        </React.Fragment>
      );
    }
    if (x === "Remove Client") {
      return (
        <React.Fragment>
          <p style={this.state.displays} className="text-center text-warning">
            <br />
            <br />
            <br />
            Outline: <br />
            Client Name: {this.state.delClientName} <br />
          </p>
          <div style={this.state.disp1}>
            <JsonToTable json={[this.state.jstb]} />
          </div>
          <div style={this.state.disp1p1}>
            <BootstrapTable
              headerClasses="header-class"
              keyField="Updated"
              data={this.state.products}
              columns={column.columns10}
            />
          </div>
        </React.Fragment>
      );
    }
  };
  form = (x) => {
    if (x === "New Job & Client") {
      return (
        <Form onSubmit={this.rest1}>
          <Input
            required
            type="number"
            name="insertJob"
            placeholder="Job Number:"
            min="0"
            max="99999"
            onChange={this.change}
          ></Input>
          <Input
            required
            type="text"
            name="clientName"
            placeholder="Client Name:"
            maxLength="128"
            onChange={this.change}
          ></Input>
          <Button className="btn btn-light btn-block" type="submit">
            Submit
          </Button>
        </Form>
      );
    }
    if (x === "New Detail") {
      return (
        <Form onSubmit={this.rest2}>
          <Input
            required
            type="number"
            name="insertJob"
            placeholder="Job Number:"
            min="0"
            max="99999"
            onChange={this.change}
          ></Input>
          <Modale onC={this.change} />
          <h4 className="text-white">↓ Select Container</h4>
          <Input required type="select" name="cont" onChange={this.change}>
            <option value="Container = N/A">N/A:</option>
            <option value="200L Drum">200L Drum</option>
            <option value="Cage">Cage</option>
            <option value="Bag">Bag</option>
            <option value="Box">Box</option>
          </Input>
          <Button className="btn btn-light btn-block" type="submit">
            Submit
          </Button>
        </Form>
      );
    }
    if (x === "Positions") {
      return (
        <React.Fragment>
          <Form onSubmit={this.rest3}>
            <Input
              required
              type="number"
              step="any"
              name="insertJobID"
              placeholder="Insert ID:"
              onChange={this.change}
            ></Input>
            <Input
              required
              type="text"
              name="posizero"
              onChange={this.change0}
              maxLength="8"
              placeholder="Positon:"
            ></Input>
            <Input
              required
              type="number"
              name="weight"
              placeholder="Weight Kg:"
              min="0"
              max="3000"
              onChange={this.change}
            ></Input>
            <Button className="btn btn-light btn-block" type="submit">
              Submit
            </Button>
          </Form>
          <Form onSubmit={this.rest12}>
            <h4 className="text-white">↓ View Single Position</h4>
            <Input
              required
              type="text"
              name="posione"
              onChange={this.change0}
              maxLength="8"
              placeholder="Positon:"
            ></Input>
            <Button className="btn btn-light btn-block" type="submit">
              Submit
            </Button>
          </Form>
          <Button
            className="btn btn-light btn-block m-0"
            onClick={this.rest13}
          >
            View All Position's
          </Button>
          <Button
            className="btn btn-light btn-block m-0"
            onClick={this.rest14}
          >
            View Free Position's
          </Button>
          <Button
            className="btn btn-light btn-block m-0"
            onClick={this.rest15}
          >
            View all Positioned Data
          </Button>
        </React.Fragment>
      );
    }
    if (x === "Checkout ID") {
      return (
        <Form onSubmit={this.rest4}>
          <Input
            required
            type="number"
            step="any"
            name="insertJobID"
            placeholder="Insert ID:"
            onChange={this.change}
          ></Input>
          <Button className="btn btn-light btn-block" type="submit">
            Submit
          </Button>
        </Form>
      );
    }
    if (x === "Find Client") {
      return (
        <React.Fragment>
          <Form onSubmit={this.rest5}>
            <Input
              required
              type="text"
              name="clientName"
              placeholder="Client Name:"
              onChange={this.change}
            ></Input>
            <Button className="btn btn-light btn-block" type="submit">
              Submit
            </Button>
          </Form>
          <Button
            className="btn btn-light btn-block m-0"
            onClick={this.rest11}
          >
            List all Job by Client
          </Button>
        </React.Fragment>
      );
    }
    if (x === "Find Job") {
      return (
        <React.Fragment>
          <Form onSubmit={this.rest6}>
            <Input
              required
              type="number"
              name="insertJob"
              placeholder="Job Number:"
              min="0"
              max="99999"
              onChange={this.change}
            ></Input>
            <ButtonGroup>
              <Button
                onClick={() => this.chk("Cecked Out")}
                className="btn btn-secondary"
                id="ck"
              >
                Cecked Out
              </Button>
              <Button
                onClick={() => this.chk("In Position")}
                className="btn btn-secondary"
                id="ip"
              >
                In Position
              </Button>
              <Button
                onClick={() => this.chk("Un Allocated")}
                className="btn btn-secondary"
                id="ua"
              >
                Un Allocated
              </Button>
            </ButtonGroup>
            <Button className="btn btn-light btn-block" type="submit">
              Submit
            </Button>
          </Form>
        </React.Fragment>
      );
    }
    if (x === "Find Positioned Details") {
      return (
        <Form onSubmit={this.rest7}>
          <Input
            required
            type="number"
            name="insertJob"
            placeholder="Job Number:"
            min="0"
            max="99999"
            onChange={this.change}
          ></Input>
          <Modale onC={this.change} />
          <Button className="btn btn-light btn-block" type="submit">
            Submit
          </Button>
        </Form>
      );
    }
    if (x === "Find Positioned Client") {
      return (
        <Form onSubmit={this.rest8}>
          <Input
            required
            type="text"
            name="clientName"
            placeholder="Client Name:"
            onChange={this.change}
          ></Input>
          <h4 className="text-white">↓ Select Container</h4>
          <Input required type="select" name="contt" onChange={this.change}>
            <option value="All">All</option>
            <option value="Container = N/A">N/A:</option>
            <option value="200L Drum">200L Drum</option>
            <option value="Cage">Cage</option>
            <option value="Bag">Bag</option>
            <option value="Box">Box</option>
          </Input>
          <Button className="btn btn-light btn-block" type="submit">
            Submit
          </Button>
        </Form>
      );
    }
    if (x === "Remove Job") {
      return (
        <Form onSubmit={this.rest9}>
          <Input
            required
            type="number"
            name="delJob"
            placeholder="Job Number:"
            min="0"
            max="99999"
            onChange={this.change}
          ></Input>
          <Button className="btn btn-light btn-block" type="submit">
            Submit
          </Button>
        </Form>
      );
    }
    if (x === "Remove Client") {
      return (
        <Form onSubmit={this.rest10}>
          <Input
            required
            type="text"
            name="delClientName"
            placeholder="Client Name:"
            maxLength="128"
            onChange={this.change}
          ></Input>
          <Button className="btn btn-light btn-block" type="submit">
            Submit
          </Button>
        </Form>
      );
    }
  };
  rest0 = () => {
    this.rss(this.state.page);
    document.getElementById("a1").remove();
    let div = document.createElement("div");
    div.setAttribute("id", "a1");
    document.getElementById("foot").appendChild(div);
    ReactDOM.render(this.form(this.state.page), document.getElementById("a1"));
  };
  rest1 = () => {
    window.event.preventDefault();
    let send = {
      insertJob: this.state.insertJob,
      clientName: this.state.clientName,
    };
    this.rest0();
    this.state.socket.emit("post1", send);
    this.state.socket.on("post1", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            displays: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
            displays: { display: "none" },
          });
    });
  };
  rest2 = () => {
    window.event.preventDefault();
    let send = {
      insertJob: this.state.insertJob,
      cont: this.state.cont,
      descrip: this.state.descrip,
    };
    this.rest0();
    this.state.socket.emit("post2", send);
    this.state.socket.on("post2", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            displays: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
            displays: { display: "none" },
          });
    });
  };
  rest3 = () => {
    window.event.preventDefault();
    if (this.state.posi.length === 8) {
      let send = {
        insertJobID: this.state.insertJobID,
        posi: this.state.posi,
        weight: this.state.weight,
      };
      this.rest0();
      this.state.socket.emit("post3", send);
      this.state.socket.on("post3", (res) => {
        res.e
          ? this.setState({
              jstb: res.e,
              disp1: { display: "block" },
              disp1p1: { display: "none" },
              displays: { display: "none" },
            })
          : this.setState({
              products: res.u,
              disp1p1: { display: "block" },
              disp1: { display: "none" },
              displays: { display: "none" },
            });
      });
    } else {
      this.setState({ disp: { display: "block" } });
    }
  };
  rest4 = () => {
    window.event.preventDefault();
    let send = { insertJobID: this.state.insertJobID };
    this.rest0();
    this.state.socket.emit("post4", send);
    this.state.socket.on("post4", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            displays: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
            displays: { display: "none" },
          });
    });
  };
  rest5 = () => {
    window.event.preventDefault();
    let send = { clientName: this.state.clientName };
    this.rest0();
    this.state.socket.emit("post5", send);
    this.state.socket.on("post5", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            displays: { display: "none" },
            disp1p11: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
            displays: { display: "none" },
            disp1p11: { display: "none" },
          });
    });
  };
  rest6 = () => {
    window.event.preventDefault();
    if (this.state.insertJob) {
      if (this.state.cout) {
        let send = {
          insertJob: this.state.insertJob,
          sumc: this.state.sumc,
        };
        this.rest0();
        this.state.socket.emit("post6", send);
        this.state.socket.on("post6", (res) => {
          res.e
            ? this.setState({
                jstb: res.e,
                disp1: { display: "block" },
                disp1p1: { display: "none" },
                displays: { display: "none" },
              })
            : this.setState({
                products: res.u,
                disp1p1: { display: "block" },
                disp1: { display: "none" },
                displays: { display: "none" },
              });
          document.getElementById("ck").classList.remove("btn-warning");
          document.getElementById("ip").classList.remove("btn-warning");
          document.getElementById("ua").classList.remove("btn-warning");
          document.getElementById("ck").classList.add("btn-secondary");
          document.getElementById("ip").classList.add("btn-secondary");
          document.getElementById("ua").classList.add("btn-secondary");
        });
      } else if (!this.state.cout) {
        this.setState({ disp2: { display: "block" } });
      }
    }
  };
  rest7 = () => {
    window.event.preventDefault();
    let send = {
      insertJob: this.state.insertJob,
      descrip: this.state.descrip,
    };
    this.rest0();
    this.state.socket.emit("post7", send);
    this.state.socket.on("post7", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            displays: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
            displays: { display: "none" },
          });
    });
  };
  rest8 = () => {
    window.event.preventDefault();
    let send = {
      clientName: this.state.clientName,
      contt: this.state.contt,
    };
    this.rest0();
    this.state.socket.emit("post8", send);
    this.state.socket.on("post8", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            displays: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
            displays: { display: "none" },
          });
    });
  };
  rest9 = () => {
    window.event.preventDefault();
    let send = { delJob: this.state.delJob };
    this.rest0();
    this.state.socket.emit("post9", send);
    this.state.socket.on("post9", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            displays: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
            displays: { display: "none" },
          });
    });
  };
  rest10 = () => {
    window.event.preventDefault();
    let send = { delClientName: this.state.delClientName };
    this.rest0();
    this.state.socket.emit("post10", send);
    this.state.socket.on("post10", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            displays: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
            displays: { display: "none" },
          });
    });
  };
  rest11 = () => {
    this.rest0();
    this.state.socket.emit("post11");
    this.state.socket.on("post11", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            disp1p11: { display: "none" },
            displays: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "none" },
            disp1p11: { display: "block" },
            disp1: { display: "none" },
            displays: { display: "none" },
          });
    });
  };
  rest12 = () => {
    window.event.preventDefault();
    if (this.state.posii.length === 8) {
      let send = { posii: this.state.posii };
      this.rest0();
      this.state.socket.emit("post12", send);
      this.state.socket.on("post12", (res) => {
        res.e
          ? this.setState({
              jstb: res.e,
              disp1: { display: "block" },
              disp1p1: { display: "none" },
              disp1p11: { display: "none" },
              disp1p111: { display: "none" },
              disp1p1111: { display: "none" },
              disp1p11111: { display: "none" },
              disp1p111111: { display: "none" },
              displays: { display: "none" },
            })
          : this.setState({
              products: res.u,
              disp1p1: { display: "none" },
              disp1p11: { display: "none" },
              disp1p111: { display: "block" },
              disp1p1111: { display: "none" },
              disp1p11111: { display: "none" },
              disp1p111111: { display: "none" },
              disp1: { display: "none" },
              displays: { display: "none" },
            });
      });
    } else {
      this.setState({ disp0: { display: "block" } });
    }
  };
  rest13 = () => {
    this.rest0();
    this.state.socket.emit("post13");
    this.state.socket.on("post13", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            disp1p11: { display: "none" },
            disp1p111: { display: "none" },
            disp1p1111: { display: "none" },
            disp1p11111: { display: "none" },
            disp1p111111: { display: "none" },
            displays: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "none" },
            disp1p11: { display: "none" },
            disp1p111: { display: "none" },
            disp1p1111: { display: "block" },
            disp1p11111: { display: "none" },
            disp1p111111: { display: "none" },
            disp1: { display: "none" },
            displays: { display: "none" },
          });
    });
  };
  rest14 = () => {
    this.rest0();
    this.state.socket.emit("post14");
    this.state.socket.on("post14", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            disp1p11: { display: "none" },
            disp1p111: { display: "none" },
            disp1p1111: { display: "none" },
            disp1p11111: { display: "none" },
            disp1p111111: { display: "none" },
            displays: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "none" },
            disp1p11: { display: "none" },
            disp1p111: { display: "none" },
            disp1p1111: { display: "none" },
            disp1p11111: { display: "block" },
            disp1p111111: { display: "none" },
            disp1: { display: "none" },
            displays: { display: "none" },
          });
    });
  };
  rest15 = () => {
    this.rest0();
    this.state.socket.emit("post15");
    this.state.socket.on("post15", (res) => {
      res.e
        ? this.setState({
            jstb: res.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
            disp1p11: { display: "none" },
            disp1p111: { display: "none" },
            disp1p1111: { display: "none" },
            disp1p11111: { display: "none" },
            disp1p111111: { display: "none" },
            displays: { display: "none" },
          })
        : this.setState({
            products: res.u,
            disp1p1: { display: "none" },
            disp1p11: { display: "none" },
            disp1p111: { display: "none" },
            disp1p1111: { display: "none" },
            disp1p11111: { display: "none" },
            disp1p111111: { display: "block" },
            disp1: { display: "none" },
            displays: { display: "none" },
          });
    });
  };
  change = (event) => {
    this.setState({
      disp1: { display: "none" },
      disp1p1: { display: "none" },
      disp1p11: { display: "none" },
      disp1p111: { display: "none" },
      disp1p1111: { display: "none" },
      disp1p11111: { display: "none" },
      disp1p111111: { display: "none" },
      displays: { display: "block" },
    });
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  posi = (event, obj) => {
    this.state.socket.emit("post16", {
      [obj]: event,
    });
    this.state.socket.on("post16", (res) => {
      if (res.zero) {
        this.setState({ posi: res.zero });
      } else if (res.zero === false) {
        this.setState({ posi: "", disp: { display: "block" } });
      }
      if (res.one) {
        this.setState({ posii: res.one });
      } else if (res.one === false) {
        this.setState({ posii: "", disp0: { display: "block" } });
      }
    });
  };
  change0 = (event) => {
    if (event.target.name === "posizero") {
      this.setState({ disp: { display: "none" } });
      if (event.target.value.length === 8) {
        this.posi(event.target.value, event.target.name);
      }
    }
    if (event.target.name === "posione") {
      this.setState({ disp0: { display: "none" } });
      if (event.target.value.length === 8) {
        this.posi(event.target.value, event.target.name);
      }
    }
  };
  chk = (a) => {
    this.setState({ cout: true, disp2: { display: "none" } });
    if (a === "Cecked Out") {
      document.getElementById("ck").classList.remove("btn-secondary");
      document.getElementById("ck").classList.add("btn-warning");
      document.getElementById("ip").classList.remove("btn-warning");
      document.getElementById("ua").classList.remove("btn-warning");
      document.getElementById("ip").classList.add("btn-secondary");
      document.getElementById("ua").classList.add("btn-secondary");
      this.setState({ sumc: "Cecked Out" });
    }
    if (a === "In Position") {
      document.getElementById("ip").classList.remove("btn-secondary");
      document.getElementById("ip").classList.add("btn-warning");
      document.getElementById("ck").classList.remove("btn-warning");
      document.getElementById("ua").classList.remove("btn-warning");
      document.getElementById("ck").classList.add("btn-secondary");
      document.getElementById("ua").classList.add("btn-secondary");
      this.setState({ sumc: "In Position" });
    }
    if (a === "Un Allocated") {
      document.getElementById("ua").classList.remove("btn-secondary");
      document.getElementById("ua").classList.add("btn-warning");
      document.getElementById("ck").classList.remove("btn-warning");
      document.getElementById("ip").classList.remove("btn-warning");
      document.getElementById("ck").classList.add("btn-secondary");
      document.getElementById("ip").classList.add("btn-secondary");
      this.setState({ sumc: "Un Allocated" });
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="cont">
        <header className="bg-dark">
          <h1 className="text-white pr-5 mr-5">{this.state.page}</h1>
        </header>
        <main>
          <div className="left0 bg-dark"></div>
          <div className="mid0 midy bg-light mx-auto">
            {this.go(this.state.page)}
          </div>
          <div className="right0 bg-dark">
            <div
              className="buu float-right"
              onClick={() => this.setState({ redirect: { pathname: "/" } })}
            >
              <div className="bur"></div>
              <div className="bur"></div>
              <div className="bur"></div>
            </div>
          </div>
        </main>
        <footer id="foot" className="bg-dark">
          <div className="text-center" style={this.state.disp2}>
            <Alertb alert="Select Checked In or Out or Un Allocated" />
          </div>
          <div className="text-center" style={this.state.disp}>
            <Alertb alert="Insert ID Position Not Vaild" />
          </div>
          <div className="text-center" style={this.state.disp0}>
            <Alertb alert="Single Position Not Vaild" />
          </div>
          <div id="a1">{this.form(this.state.page)}</div>
        </footer>
      </div>
    );
  }
}

export default Store;
