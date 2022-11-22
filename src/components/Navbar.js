import React, { Component } from 'react';
import Identicon from 'identicon.js';
import logo from '../logo.png';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar  col-12 p-0">
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
        </div><button id='profilecard' className='card navbar-nav col-sm-3 col-md-3 mr-3 p-3 pt-4 ' onClick={this.props.showUser}>
        <div >
          <ul className=" text-monospace ">
            <li> 
              <small id="account">
                <a target="_blank"
                  alt=""
                  className="text-white"
                  rel="noopener noreferrer"
                  href={"https://etherscan.io/address/" + this.props.account}>
                  {this.props.account?'Address :' + this.props.account.substring(0, 15) + '...' + this.props.account.substring(this.props.account.length - 3, this.props.account.length):'Login'}
                </a>
              </small>
              {this.props.account
                ? <img id='acc'
                  alt=""
                  className='ml-2'
                  width='30'
                  height='30'
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                />
                : <span ></span>
              }
            </li>
          </ul>
        </div></button>
        <div id='navbtndiv' className='center p-0 col-sm-12'>
          <button id='upldbtn' className='text-white col-sm-6 border-0 navbtn' onClick={this.props.showUpl}>Upload</button>
          <button id='viewbtn' className='text-white col-sm-6 border-0 navbtn' onClick={this.props.showProj}>ProjectChain</button>
        </div>
      </nav>
    );
  }
}

export default Navbar;