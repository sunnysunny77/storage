import ReactDOM from 'react-dom'
import React from 'react'

import axios from 'axios'

import './index.css'
import Nav from './nav.js'

import 'bootstrap/dist/css/bootstrap.min.css'

import Alertb from './boot.js'

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uname: null,
            psw: null,
            disp: { display: 'none' },
            disp1: { display: 'block' }
        }
    }
    log = () => {
        window.event.preventDefault()
        let s = { user: this.state.uname, psw: this.state.psw }
        axios.post(`https:///post0`, s)
            .then(res => {
                if (res.data) {
                    ReactDOM.render(<Nav />, document.getElementById('root'))
                }
                if (!res.data) {
                    this.setState({ disp: { display: 'block', height: "117px" }, disp1: { display: 'none' } })
                    setTimeout(() => {
                        this.setState({ disp: { display: 'none' }, disp1: { display: 'block' } })
                    }, 1500)
                }
            })
    }
    change = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({ [nam]: val })
    }
    render() {
        return (
            <div className="cont">
                <header className="bg-dark">
                    <h1 className="text-white mr-4 pr-2 ">Storage</h1>
                </header>
                <main>
                    <div className="left0 bg-dark"></div>
                    <div className="mid0 bg-light mx-auto" style={{padding: "calc(50vh - 201px) 0"}}>
                        <div className="text-center" style={this.state.disp }>
                            <Alertb  alert="Incorrect Credentials" />
                        </div>
                        <div style={this.state.disp1}>
                            <form  onSubmit={this.log}>
                                <input type="text" className="form-control text-center" placeholder="Enter Username" name="uname" required onChange={this.change}></input>
                                <input type="password" className="form-control text-center" placeholder="Enter Password" name="psw" required onChange={this.change}></input>
                                <button type="submit" className="btn btn-light btn-block">Login</button>
                            </form>
                        </div>
                    </div>
                    <div className="right0 bg-dark"></div>
                </main>
                <footer className="bg-dark"></footer>
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'))

