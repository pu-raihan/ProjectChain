import React, { Component } from 'react';
import Navbar from './Navbar'
import Upload from './Upload';
import Projects from './Projects';
import User from './User';


class Main extends Component {


  constructor(props) {
    super(props)
    this.state = {
      tab: true
    }
  }
  switchTab = () => {
    this.setState({
      tab: true
    })
  }
  showProj = () => {
    this.setState({
      tab: false
    })
  }

  render() {
    return (
      <div>
        {this.props.currentUser != 0
          ? <div>
            <Navbar
              currentUser={this.props.currentUser}
              switchTab={this.switchTab}
              showProj={this.showProj}
              account={this.props.account} /><div className="container-fluid mt-1  text-center">
              <div className="row ">
                <main role="main" className="col-12 " >
                  <div className="content col-12 p-0 ">
                    <p>&nbsp;</p>
                    {this.state.tab ?
                      <Upload
                        currentUser={this.props.currentUser}
                        projects={this.props.projects}
                        captureProject={this.props.captureProject}
                        uploadProj={this.props.uploadProj}
                      /> :
                      <Projects
                        projects={this.props.projects}
                      />
                    }
                  </div>
                </main>
              </div>
            </div>
          </div>
          : <User
            currentUser={this.props.currentUser}
            projects={this.props.projects}
            regUser={this.props.regUser}
            login={this.props.login}
          />}
      </div>
    );
  }
}

export default Main;