import React, { Component } from 'react';
import logo from '../logo.png';


class User extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tab: true
        }
    }
    logTab = () => {
        this.setState({ tab: true })
    }
    signTab = () => {
        this.setState({ tab: false })
    }
    render() {
        return (<div>{
            !this.props.isLogged
                ? <div>
                    <nav className="navbar col-12 p-0">
                        <div className="navbar-brand mt-3 col-md-7 col-sm-8">
                            <a
                                className='col-sm-4 col-md-2 p-3 mt-5'
                                href="http://github.com/pu-raihan"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img id='logo' src={logo} className=" align-top" alt="" />
                            </a>
                            <div id='line' className='navbar-brand ml-3 bg-secondary'>&nbsp;</div>
                            <p id="desc" className='navbar-brand col-sm-7 text-secondary'>ProjectChain is an advanced blockchain of projects. This application ensures the security and integrity of the projects</p>
                        </div>
                    </nav>
                    <div id='user' className="card navbar col-sm-8 col-md-6 mx-auto mt-5 logcard p-0" style={{ borderRadius: '10px' }}>
                        <div className='nav navbar-brand col-12 p-0'>
                            <button id="logTab" class="col-6  nav-item active" onClick={this.logTab}><b>Login</b></button>
                            <button id="logTab" class="col-6  nav-item" onClick={this.signTab}><b>SignUp</b></button>
                        </div>
                        <div className='card-body col-md-9 col-sm-10 '>
                            <form><div className="form-group align-left text-center pt-5">
                                <label className=' navbar-brand text-white'>Username :</label><input
                                    id="uname"
                                    type="text"
                                    ref={(input) => { this.uname = input }}
                                    className="form-control navbar-brand ml-auto mr-auto col-8 "
                                    // placeholder="Enter your username!"
                                    required />
                                <br />
                                <label className=' navbar-brand text-white'>Password  :</label><input
                                    id="pwd"
                                    type="text"
                                    ref={(input) => { this.pwd = input }}
                                    className=" navbar-brand form-control ml-auto mr-auto col-8"
                                    // placeholder="Enter your password!"
                                    required />
                            </div>
                                <br /><br />
                            </form><div className='text-center'>
                            {this.state.tab ?
                                <button type="submit" onClick={(event) => {
                                    event.preventDefault()
                                    const uname = this.uname.value
                                    const pwd = this.pwd.value
                                    this.props.login(uname, pwd)
                                }} id="signup" className=''><b>Login</b></button>
                                : <button type="submit" onClick={(event) => {
                                    event.preventDefault()
                                    const uname = this.uname.value
                                    const pwd = this.pwd.value
                                    this.props.regUser(uname, pwd)
                                }} id="login"><b>SignUp</b></button>
                            }</div>
                            <br />
                        </div>
                    </div>
                </div>
                : <div>Logged In
                    <button id="file-upload-btn" onClick={this.props.logout}><b>Log out</b></button>
                </div>}
        </div>
        );
    }
}
export default User;