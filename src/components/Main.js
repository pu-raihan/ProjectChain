import React, { Component } from 'react';
import Navbar from './Navbar'
import Upload from './Upload';
import Projects from './Projects';
import User from './User';


class Main extends Component {

  render() {
    return (
      <div>
        {this.props.currentUser !== 0
          ? <div>
            <Navbar
              currentUser={this.props.currentUser}
              showUpl={this.props.showUpl}
              showProj={this.props.showProj}
              showUser={this.props.showUser}
              account={this.props.account} /><div className="container-fluid mt-1  text-center">
              <div className="row ">
                <main role="main" className="col-12 " >
                  <div className="content col-12 p-0 ">
                    <p>&nbsp;</p>
                    {this.props.tab === 1 ?
                      <Upload
                        currentUser={this.props.currentUser}
                        projects={this.props.projects}
                        captureProject={this.props.captureProject}
                        uploadProj={this.props.uploadProj}
                      /> :
                      this.props.tab === 2 ?
                        <Projects
                          projects={this.props.projects}
                        />
                        : <User
                          currentUser={this.props.currentUser}
                          isLogged={this.props.isLogged}
                          projects={this.props.projects}
                          regUser={this.props.regUser}
                          login={this.props.login}
                          logout={this.props.logout}
                        />
                    }
                  </div>
                </main>
              </div>
            </div>
          </div>
          : <User
            currentUser={this.props.currentUser}
            isLogged={this.props.isLogged}
            projects={this.props.projects}
            regUser={this.props.regUser}
            login={this.props.login}
            logout={this.props.logout}
          />
        }
      </div>
    );
  }
}

export default Main;