import React, { Component } from 'react';
import Profile from './Profile';


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
                ?
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
                                }} id="signup" className='btn1'><b>Login</b></button>
                                : <button type="submit" onClick={(event) => {
                                    event.preventDefault()
                                    const uname = this.uname.value
                                    const pwd = this.pwd.value
                                    this.props.regUser(uname, pwd)
                                }} id="login" className='btn2'><b>SignUp</b></button>
                            }</div>
                        <br />
                    </div>
                </div>
                :  <Profile
                currentUser={this.props.currentUser}
                isLogged={this.props.isLogged}
                projects={this.props.projects}
                users={this.props.users}
                logout={this.props.logout}
                account={this.props.account}
              />}
        </div>
        );
    }
}
export default User;