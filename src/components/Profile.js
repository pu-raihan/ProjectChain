import React, { Component } from 'react';
import Identicon from 'identicon.js';


class Profile extends Component {

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
        return (
            <div id='profile' className="card text-white col-sm-12 col-md-8 mx-auto mt-5 p-0" >
                <div className='m-5 '>
                    {this.props.account
                        ? <img id='acc'
                            alt=""
                            className='float-left'
                            width='100'
                            height='100'
                            src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                        />
                        : <span ></span>
                    }
                    <div className='navbar-brand'>
                        <span className='h3 text-justify '>
                            {this.props.users.map((user, key) => {
                                if (key === this.props.currentUser)
                                    return (
                                        <p key={key}>{user.userName}</p>
                                    )
                                    else return(<div></div>)
                            })}</span>
                        <span className='text-muted h6'> Address :</span>
                        {this.props.account ? <span className=' props h6'> {this.props.account}</span> : 'Login'}
                    </div>
                </div>
                <div>
                    <button className='btn1 col-md-2 mb-5 col-sm-2' onClick={this.props.logout}><b>Log out</b></button>
                </div>
            </div>

        );
    }
}
export default Profile;