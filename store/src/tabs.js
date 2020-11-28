import React from "react";
import ReactDOM from "react-dom";
import Alertb from "./boot.js";
import Nav from "./nav.js";
import Modale from "./modals.js";
import "./index.css";

import axios from "axios";
import { Button, ButtonGroup, Form, Input } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ToolkitProvider, { ColumnToggle } from "react-bootstrap-table2-toolkit";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { JsonToTable } from "react-json-to-table";

const columns1 = [
  {
    dataField: "Updated",
    text: "Updated",
  },
  {
    dataField: "Client",
    text: "Client",
  },
  {
    dataField: "In_D",
    text: "In_D",
  },
];

const columns2 = [
  {
    dataField: "Updated",
    text: "Updated",
  },
  {
    dataField: "ID",
    text: "ID",
  },
  {
    dataField: "Details",
    text: "Details",
  },
  {
    dataField: "In_D",
    text: "In_D",
  },
  {
    dataField: "Container",
    text: "Container",
  },
];

const columns3 = [
  {
    dataField: "Updated",
    text: "Updated",
  },
  {
    dataField: "ID",
    text: "ID",
  },
  {
    dataField: "Position",
    text: "Position",
  },
  {
    dataField: "Weight",
    text: "Weight",
  },
];

const columns4 = [
  {
    dataField: "Cked_Out",
    text: "Cked_Out",
  },
  {
    dataField: "Out_D",
    text: "Out_D",
  },
];

const columns5 = [
  {
    dataField: "jobNum",
    text: "Job#",
  },
  {
    dataField: "clientName",
    text: "Client",
  },
];

const columns6 = [
  {
    dataField: "ID",
    text: "ID",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "jobNum",
    text: "Job#",
    hidden: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "clientName",
    text: "Client",
    hidden: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDesc",
    text: "Details",
    sort: true,
    filter: textFilter({ placeholder: "Find Details" }),
    headerStyle: {
      width: "auto",
      overflow: "hidden",
    },
  },
  {
    dataField: "entryContainer",
    text: "Container",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDate",
    text: "In_D",
    hidden: true,
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "checkedOutDate",
    text: "Out_D",
    hidden: true,
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiPosition",
    text: "Position",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiWeight",
    text: "Weight",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
];

const columns7 = [
  {
    dataField: "ID",
    text: "ID",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "jobNum",
    text: "Job#",
    hidden: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "clientName",
    text: "Client",
    hidden: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDesc",
    text: "Details",
    sort: true,
    headerStyle: {
      width: "auto",
      overflow: "hidden",
    },
  },
  {
    dataField: "entryContainer",
    text: "Container",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDate",
    text: "In_D",
    sort: true,
    hidden: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiPosition",
    text: "Position",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiWeight",
    text: "Weight",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
];

const columns8 = [
  {
    dataField: "ID",
    text: "ID",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "jobNum",
    text: "Job#",
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "clientName",
    text: "Client",
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDesc",
    text: "Details",
    sort: true,
    headerStyle: {
      width: "auto",
      overflow: "auto",
    },
  },
  {
    dataField: "entryContainer",
    text: "Container",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "entryDate",
    text: "In_D",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiPosition",
    text: "Position",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
  {
    dataField: "posiWeight",
    text: "Weight",
    sort: true,
    headerStyle: {
      overflow: "hidden",
    },
  },
];

const columns9 = [
  {
    dataField: "Updated",
    text: "Updated",
  },
];
const columns10 = [
  {
    dataField: "Updated",
    text: "Updated",
  },
];

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: null,
      insertJob: null,
      insertJobID: null,
      delJob: null,
      delClientName: null,
      descrip: null,
      cont: "Container = N/A",
      posi: null,
      weight: null,
      disp: { display: "none" },
      disp1: { display: "none" },
      disp1p1: { display: "none" },
      color: { color: "black" },
      colorf: { color: "black" },
      colorff: { color: "black" },
      locs: null,
      cout: false,
      count: null,
      h: this.props.page,
      jstb: [],
      products: [],
    };
  }
  rss = () => {
    this.setState({
      clientName: null,
      insertJob: null,
      insertJobID: null,
      delJob: null,
      delClientName: null,
      descrip: null,
      cont: "Container = N/A",
      posi: null,
      weight: null,
      disp: { display: "none" },
      disp1: { display: "none" },
      disp1p1: { display: "none" },
      color: { color: "black" },
      colorf: { color: "black" },
      colorff: { color: "black" },
      locs: null,
      cout: false,
      count: null,
      h: this.props.page,
      jstb: [],
      products: [],
    });
  };
  go = () => {
    if (this.state.h === 1) {
      return (
        <div className="cont">
          <header className="bg-dark">
            <h1 className="text-white pr-5 mr-5">New Job</h1>
          </header>
          <main>
            <div className="left0 bg-dark"></div>
            <div
              className="mid0 bg-light mx-auto"
              style={(this.state.disp1, { height: "calc(100vh - 288px)" })}
            >
              <div style={this.state.disp1}>
                <JsonToTable json={[this.state.jstb]} />
              </div>
              <div style={this.state.disp1p1}>
                <BootstrapTable
                  headerClasses="header-class"
                  keyField="Updated"
                  data={this.state.products}
                  columns={columns1}
                />
              </div>
            </div>
            <div className="right0 bg-dark">
              <div className="buu float-right" onClick={this.reload}>
                <div className="bur"></div>
                <div className="bur"></div>
                <div className="bur"></div>
              </div>
            </div>
          </main>
          <footer id="foot" className="bg-dark">
            <div id="a1">
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
            </div>
          </footer>
        </div>
      );
    }
    if (this.state.h === 2) {
      return (
        <div className="cont">
          <header className="bg-dark">
            <h1 className="text-white pr-5 mr-5">New Detail</h1>
          </header>

          <main>
            <div className="left0 bg-dark"></div>
            <div
              className="mid0 bg-light mx-auto"
              style={(this.state.disp1, { height: "calc(100vh - 288px)" })}
            >
              <div style={this.state.disp1}>
                <JsonToTable json={[this.state.jstb]} />
              </div>
              <div style={this.state.disp1p1}>
                <BootstrapTable
                  headerClasses="header-class"
                  keyField="Updated"
                  data={this.state.products}
                  columns={columns2}
                />
              </div>
            </div>
            <div className="right0 bg-dark">
              <div className="buu float-right" onClick={this.reload}>
                <div className="bur"></div>
                <div className="bur"></div>
                <div className="bur"></div>
              </div>
            </div>
          </main>
          <footer id="foot" className="bg-dark">
            <div id="a1">
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
                <Modale onC={this.change} plh={this.state.descrip} />
                <h4 className="text-white">↓ Select Container</h4>
                <Input
                  required
                  type="select"
                  value={this.state.cont}
                  name="cont"
                  onChange={this.change}
                >
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
            </div>
          </footer>
        </div>
      );
    }
    if (this.state.h === 3) {
      return (
        <div className="cont">
          <header className="bg-dark">
            <h1 className="text-white pr-5 mr-5">New Position</h1>
          </header>
          <main>
            <div className="left0 bg-dark"></div>
            <div
              className="mid0 bg-light mx-auto"
              style={(this.state.disp1, { height: "calc(100vh - 288px)" })}
            >
              <div style={this.state.disp1}>
                <JsonToTable json={[this.state.jstb]} />
              </div>
              <div style={this.state.disp1p1}>
                <BootstrapTable
                  headerClasses="header-class"
                  keyField="Updated"
                  data={this.state.products}
                  columns={columns3}
                />
              </div>
            </div>
            <div className="right0 bg-dark">
              <div className="buu float-right" onClick={this.reload}>
                <div className="bur"></div>
                <div className="bur"></div>
                <div className="bur"></div>
              </div>
            </div>
          </main>
          <footer id="foot" className="bg-dark">
            <div style={this.state.disp}>
              <Alertb alert="Position Not Vaild" />
            </div>
            <div id="a1">
              <Form onSubmit={this.rest3}>
                <Button className="btn btn-light btn-block" onClick={this.bt0}>
                  View Position's
                </Button>
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
            </div>
          </footer>
        </div>
      );
    }
    if (this.state.h === 4) {
      return (
        <div className="cont">
          <header className="bg-dark">
            <h1 className="text-white pr-5 mr-5">Checkout ID</h1>
          </header>
          <main>
            <div className="left0 bg-dark"></div>
            <div
              className="mid0 bg-light mx-auto"
              style={(this.state.disp1, { height: "calc(100vh - 288px)" })}
            >
              <div style={this.state.disp1}>
                <JsonToTable json={[this.state.jstb]} />
              </div>
              <div style={this.state.disp1p1}>
                <BootstrapTable
                  headerClasses="header-class"
                  keyField="Cked_Out"
                  data={this.state.products}
                  columns={columns4}
                />
              </div>
            </div>
            <div className="right0 bg-dark">
              <div className="buu float-right" onClick={this.reload}>
                <div className="bur"></div>
                <div className="bur"></div>
                <div className="bur"></div>
              </div>
            </div>
          </main>
          <footer id="foot" className="bg-dark">
            <div id="a1">
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
            </div>
          </footer>
        </div>
      );
    }
    if (this.state.h === 5) {
      return (
        <div className="cont">
          <header className="bg-dark">
            <h1 className="text-white pr-5 mr-5">Find Client</h1>
          </header>
          <main>
            <div className="left0 bg-dark"></div>
            <div
              className="mid0 bg-light mx-auto"
              style={(this.state.disp1, { height: "calc(100vh - 288px)" })}
            >
              <div style={this.state.disp1}>
                <JsonToTable json={[this.state.jstb]} />
              </div>
              <div style={this.state.disp1p1}>
                <BootstrapTable
                  headerClasses="header-class"
                  keyField="jobNum"
                  data={this.state.products}
                  columns={columns5}
                />
              </div>
            </div>
            <div className="right0 bg-dark">
              <div className="buu float-right" onClick={this.reload}>
                <div className="bur"></div>
                <div className="bur"></div>
                <div className="bur"></div>
              </div>
            </div>
          </main>
          <footer id="foot" className="bg-dark">
            <div id="a1">
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
            </div>
          </footer>
        </div>
      );
    }
    if (this.state.h === 6) {
      const { ToggleList } = ColumnToggle;
      return (
        <div className="cont">
          <header className="bg-dark">
            <h1 className="text-white pr-5 mr-5">Find </h1>
          </header>
          <main>
            <div className="left0 bg-dark"></div>
            <div
              className="mid0 bg-light mx-auto"
              style={(this.state.disp1, { height: "calc(100vh - 288px)" })}
            >
              <div style={this.state.disp1}>
                <JsonToTable json={[this.state.jstb]} />
              </div>
              <div style={this.state.disp1p1}>
                <ToolkitProvider
                  keyField="ID"
                  data={this.state.products}
                  columns={columns6}
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
                        filter={filterFactory()}
                        {...props.baseProps}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </div>
            </div>
            <div className="right0 bg-dark">
              <div className="buu float-right" onClick={this.reload}>
                <div className="bur"></div>
                <div className="bur"></div>
                <div className="bur"></div>
              </div>
            </div>
          </main>
          <footer id="foot" className="bg-dark">
            <div style={this.state.disp}>
              <Alertb alert="Select Checked IN or OUT" />
            </div>
            <div id="a1">
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
                    onClick={() => this.chk(0)}
                    style={this.state.colorf}
                    className="btn btn-warning"
                  >
                    Cecked Out
                  </Button>
                  <Button
                    onClick={() => this.chk(1)}
                    style={this.state.color}
                    className="btn btn-warning"
                  >
                    In Position
                  </Button>
                  <Button
                    onClick={() => this.chk(2)}
                    style={this.state.colorff}
                    className="btn btn-warning"
                  >
                    Un Allocated
                  </Button>
                </ButtonGroup>
                <Button className="btn btn-light btn-block" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </footer>
        </div>
      );
    }
    if (this.state.h === 7) {
      const { ToggleList } = ColumnToggle;
      return (
        <div className="cont">
          <header className="bg-dark">
            <h1 className="text-white pr-5 mr-5">Find Positioned Details</h1>
          </header>
          <main>
            <div className="left0 bg-dark"></div>
            <div
              className="mid0 bg-light mx-auto"
              style={(this.state.disp1, { height: "calc(100vh - 288px)" })}
            >
              <div style={this.state.disp1}>
                <JsonToTable json={[this.state.jstb]} />
              </div>
              <div style={this.state.disp1p1}>
                <ToolkitProvider
                  keyField="ID"
                  data={this.state.products}
                  columns={columns7}
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
            </div>
            <div className="right0 bg-dark">
              <div className="buu float-right" onClick={this.reload}>
                <div className="bur"></div>
                <div className="bur"></div>
                <div className="bur"></div>
              </div>
            </div>
          </main>
          <footer id="foot" className="bg-dark">
            <div id="a1">
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
                <Modale onC={this.change} value={this.state.descrip} />
                <Button className="btn btn-light btn-block" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </footer>
        </div>
      );
    }
    if (this.state.h === 8) {
      return (
        <div className="cont">
          <header className="bg-dark">
            <h1 className="text-white pr-5 mr-5">
              Find Positioned Client Container
            </h1>
          </header>
          <main>
            <div className="left0 bg-dark"></div>
            <div
              className="mid0 bg-light mx-auto"
              style={(this.state.disp1, { height: "calc(100vh - 288px)" })}
            >
              <div style={this.state.disp1}>
                <JsonToTable json={[this.state.jstb]} />
              </div>
              <div style={this.state.disp1p1}>
                <BootstrapTable
                  headerClasses="header-class"
                  keyField="ID"
                  data={this.state.products}
                  columns={columns8}
                />
              </div>
            </div>
            <div className="right0 bg-dark">
              <div className="buu float-right" onClick={this.reload}>
                <div className="bur"></div>
                <div className="bur"></div>
                <div className="bur"></div>
              </div>
            </div>
          </main>

          <footer id="foot" className="bg-dark">
            <div id="a1">
              <Form onSubmit={this.rest8}>
                <Input
                  required
                  type="text"
                  name="clientName"
                  placeholder="Client Name:"
                  onChange={this.change}
                ></Input>
                <h4 className="text-white">↓ Select Container</h4>
                <Input
                  required
                  type="select"
                  value={this.state.cont}
                  name="cont"
                  onChange={this.change}
                >
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
            </div>
          </footer>
        </div>
      );
    }
    if (this.state.h === 9) {
      return (
        <div className="cont">
          <header className="bg-dark">
            <h1 className="text-white pr-5 mr-5">Remove Job</h1>
          </header>
          <main>
            <div className="left0 bg-dark"></div>
            <div
              className="mid0 bg-light mx-auto"
              style={(this.state.disp1, { height: "calc(100vh - 288px)" })}
            >
              <div style={this.state.disp1}>
                <JsonToTable json={[this.state.jstb]} />
              </div>
              <div style={this.state.disp1p1}>
                <BootstrapTable
                  headerClasses="header-class"
                  keyField="Updated"
                  data={this.state.products}
                  columns={columns9}
                />
              </div>
            </div>
            <div className="right0 bg-dark">
              <div className="buu float-right" onClick={this.reload}>
                <div className="bur"></div>
                <div className="bur"></div>
                <div className="bur"></div>
              </div>
            </div>
          </main>
          <footer id="foot" className="bg-dark">
            <div id="a1">
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
            </div>
          </footer>
        </div>
      );
    }
    if (this.state.h === 10) {
      return (
        <div className="cont">
          <header className="bg-dark">
            <h1 className="text-white pr-5 mr-5">Remove Client</h1>
          </header>
          <main>
            <div className="left0 bg-dark"></div>
            <div
              className="mid0 bg-light mx-auto"
              style={(this.state.disp1, { height: "calc(100vh - 288px)" })}
            >
              <div style={this.state.disp1}>
                <JsonToTable json={[this.state.jstb]} />
              </div>
              <div style={this.state.disp1p1}>
                <BootstrapTable
                  headerClasses="header-class"
                  keyField="Updated"
                  data={this.state.products}
                  columns={columns10}
                />
              </div>
            </div>
            <div className="right0 bg-dark">
              <div className="buu float-right" onClick={this.reload}>
                <div className="bur"></div>
                <div className="bur"></div>
                <div className="bur"></div>
              </div>
            </div>
          </main>
          <footer id="foot" className="bg-dark">
            <div id="a1">
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
            </div>
          </footer>
        </div>
      );
    }
  };

  reload() {
    ReactDOM.render(<Nav />, document.getElementById("root"));
  }
  rest1 = () => {
    window.event.preventDefault();
    document.getElementById("a1").remove();
    let div = document.createElement("div");
    div.setAttribute("id", "a1");
    document.getElementById("foot").appendChild(div);
    ReactDOM.render(
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
      </Form>,
      document.getElementById("a1")
    );
    let send = {
      insertJob: this.state.insertJob,
      clientName: this.state.clientName,
    };
    this.rss();
    axios.post(`https:///post1`, send).then((res) => {
      res.data.e
        ? this.setState({
            jstb: res.data.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
          })
        : this.setState({
            products: res.data.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
          });
    });
  };
  rest2 = () => {
    window.event.preventDefault();
    document.getElementById("a1").remove();
    let div = document.createElement("div");
    div.setAttribute("id", "a1");
    document.getElementById("foot").appendChild(div);
    ReactDOM.render(
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
        <Modale onC={this.change} plh={this.state.descrip} />
        <h4 className="text-white">↓ Select Container</h4>
        <Input
          required
          type="select"
          value={this.state.cont}
          name="cont"
          onChange={this.change}
        >
          <option value="Container = N/A">N/A:</option>
          <option value="200L Drum">200L Drum</option>
          <option value="Cage">Cage</option>
          <option value="Bag">Bag</option>
          <option value="Box">Box</option>
        </Input>
        <Button className="btn btn-light btn-block" type="submit">
          Submit
        </Button>
      </Form>,
      document.getElementById("a1")
    );
    let send = {
      insertJob: this.state.insertJob,
      cont: this.state.cont,
      descrip: this.state.descrip,
    };
    this.rss();
    axios.post(`https:///post2`, send).then((res) => {
      res.data.e
        ? this.setState({
            jstb: res.data.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
          })
        : this.setState({
            products: res.data.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
          });
    });
  };
  rest3 = () => {
    window.event.preventDefault();
    document.getElementById("a1").remove();
    let div = document.createElement("div");
    div.setAttribute("id", "a1");
    document.getElementById("foot").appendChild(div);
    ReactDOM.render(
      <Form onSubmit={this.rest3}>
        <Button className="btn btn-light btn-block" onClick={this.bt0}>
          View Position's
        </Button>
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
      </Form>,
      document.getElementById("a1")
    );
    if (this.state.posi.length === 8) {
      let send = {
        insertJobID: this.state.insertJobID,
        posi: this.state.posi,
        weight: this.state.weight,
      };
      this.rss();
      axios.post(`https:///post3`, send).then((res) => {
        res.data.e
          ? this.setState({
              jstb: res.data.e,
              disp1: { display: "block" },
              disp1p1: { display: "none" },
            })
          : this.setState({
              products: res.data.u,
              disp1p1: { display: "block" },
              disp1: { display: "none" },
            });
      });
    } else {
      this.setState({ disp: { display: "block" } });
    }
  };
  rest4 = () => {
    window.event.preventDefault();
    document.getElementById("a1").remove();
    let div = document.createElement("div");
    div.setAttribute("id", "a1");
    document.getElementById("foot").appendChild(div);
    ReactDOM.render(
      <Form onSubmit={this.rest4} id="a1">
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
      </Form>,
      document.getElementById("a1")
    );
    let send = { insertJobID: this.state.insertJobID };
    this.rss();
    axios.post(`https:///post4`, send).then((res) => {
      res.data.e
        ? this.setState({
            jstb: res.data.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
          })
        : this.setState({
            products: res.data.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
          });
    });
  };
  rest5 = () => {
    window.event.preventDefault();
    document.getElementById("a1").remove();
    let div = document.createElement("div");
    div.setAttribute("id", "a1");
    document.getElementById("foot").appendChild(div);
    ReactDOM.render(
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
      </Form>,
      document.getElementById("a1")
    );
    let send = { clientName: this.state.clientName };
    this.rss();
    axios.post(`https:///post5`, send).then((res) => {
      res.data.e
        ? this.setState({
            jstb: res.data.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
          })
        : this.setState({
            products: res.data.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
          });
    });
  };
  rest6 = () => {
    window.event.preventDefault();
    document.getElementById("a1").remove();
    let div = document.createElement("div");
    div.setAttribute("id", "a1");
    document.getElementById("foot").appendChild(div);
    ReactDOM.render(
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
            onClick={() => this.chk(0)}
            style={this.state.colorf}
            className="btn btn-warning"
          >
            Cecked Out
          </Button>
          <Button
            onClick={() => this.chk(1)}
            style={this.state.color}
            className="btn btn-warning"
          >
            In Position
          </Button>
          <Button
            onClick={() => this.chk(2)}
            style={this.state.colorff}
            className="btn btn-warning"
          >
            Un Allocated
          </Button>
        </ButtonGroup>
        <Button className="btn btn-light btn-block" type="submit">
          Submit
        </Button>
      </Form>,
      document.getElementById("a1")
    );
    if (this.state.insertJob) {
      if (this.state.cout) {
        let send = {
          insertJob: this.state.insertJob,
          count: this.state.count,
        };
        this.rss();
        axios
          .post(`https:///post6`, send)
          .then((res) => {
            res.data.e
              ? this.setState({
                  jstb: res.data.e,
                  disp1: { display: "block" },
                  disp1p1: { display: "none" },
                })
              : this.setState({
                  products: res.data.u,
                  disp1p1: { display: "block" },
                  disp1: { display: "none" },
                });
          });
      } else {
        this.setState({ disp: { display: "block" } });
      }
    }
  };
  rest7 = () => {
    window.event.preventDefault();
    document.getElementById("a1").remove();
    let div = document.createElement("div");
    div.setAttribute("id", "a1");
    document.getElementById("foot").appendChild(div);
    ReactDOM.render(
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
        <Modale onC={this.change} value={this.state.descrip} />
        <Button className="btn btn-light btn-block" type="submit">
          Submit
        </Button>
      </Form>,
      document.getElementById("a1")
    );
    let send = {
      insertJob: this.state.insertJob,
      descrip: this.state.descrip,
    };
    this.rss();
    axios.post(`https:///post7`, send).then((res) => {
      res.data.e
        ? this.setState({
            jstb: res.data.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
          })
        : this.setState({
            products: res.data.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
          });
    });
  };
  rest8 = () => {
    window.event.preventDefault();
    document.getElementById("a1").remove();
    let div = document.createElement("div");
    div.setAttribute("id", "a1");
    document.getElementById("foot").appendChild(div);
    ReactDOM.render(
      <Form onSubmit={this.rest8}>
        <Input
          required
          type="text"
          name="clientName"
          placeholder="Client Name:"
          onChange={this.change}
        ></Input>
        <h4 className="text-white">↓ Select Container</h4>
        <Input
          required
          type="select"
          value={this.state.cont}
          name="cont"
          onChange={this.change}
        >
          <option value="Container = N/A">N/A:</option>
          <option value="200L Drum">200L Drum</option>
          <option value="Cage">Cage</option>
          <option value="Bag">Bag</option>
          <option value="Box">Box</option>
        </Input>

        <Button className="btn btn-light btn-block" type="submit">
          Submit
        </Button>
      </Form>,
      document.getElementById("a1")
    );
    let send = {
      clientName: this.state.clientName,
      cont: this.state.cont,
    };
    this.rss();
    axios.post(`https:///post8`, send).then((res) => {
      res.data.e
        ? this.setState({
            jstb: res.data.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
          })
        : this.setState({
            products: res.data.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
          });
    });
  };
  rest9 = () => {
    window.event.preventDefault();
    document.getElementById("a1").remove();
    let div = document.createElement("div");
    div.setAttribute("id", "a1");
    document.getElementById("foot").appendChild(div);
    ReactDOM.render(
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
      </Form>,
      document.getElementById("a1")
    );
    let send = { delJob: this.state.delJob };
    this.rss();
    axios.post(`https:///post9`, send).then((res) => {
      res.data.e
        ? this.setState({
            jstb: res.data.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
          })
        : this.setState({
            products: res.data.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
          });
    });
  };
  rest10 = () => {
    window.event.preventDefault();
    document.getElementById("a1").remove();
    let div = document.createElement("div");
    div.setAttribute("id", "a1");
    document.getElementById("foot").appendChild(div);
    ReactDOM.render(
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
      </Form>,
      document.getElementById("a1")
    );
    let send = { delClientName: this.state.delClientName };
    this.rss();
    axios.post(`https:///post10`, send).then((res) => {
      res.data.e
        ? this.setState({
            jstb: res.data.e,
            disp1: { display: "block" },
            disp1p1: { display: "none" },
          })
        : this.setState({
            products: res.data.u,
            disp1p1: { display: "block" },
            disp1: { display: "none" },
          });
    });
  };
  change = (event) => {
    this.setState({ disp1: { display: "none" }, disp1p1: { display: "none" } });
    let nam = event.target.name;
    let val = event.target.value;
    console.log({ [nam]: val });
    this.setState({ [nam]: val });
  };
  change0 = (posi) => {
    this.setState({ posi: posi.target.value, disp: { display: "none" } });
    if (posi.target.value.length === 8) {
      axios
        .post(`https:///loc`, {
          posi: posi.target.value,
        })
        .then((res) => {
          if (res.data.posi === false) {
            this.setState({ disp: { display: "block" } });
          }
          return this.setState({ posi: res.data.posi });
        });
    }
  };
  chk = (a) => {
    this.setState({
      cout: true,
      disp1: { display: "none" },
      disp1p1: { display: "none" },
    });
    if (a === 0) {
      this.setState({
        count: a,
        color: { color: "black" },
        colorf: { color: "#ffffff" },
        colorff: { color: "black" },
      });
    }
    if (a === 1) {
      this.setState({
        count: a,
        color: { color: "#ffffff" },
        colorf: { color: "black" },
        colorff: { color: "black" },
      });
    }
    if (a === 2) {
      this.setState({
        count: a,
        color: { color: "black" },
        colorf: { color: "black" },
        colorff: { color: "#ffffff" },
      });
    }
  };
  bt0 = () => {
    window.open("https:///loc", "_blank");
  };
  render() {
    return <div>{this.go()}</div>;
  }
}

export default Tabs;
