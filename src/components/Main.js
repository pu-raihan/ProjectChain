import React, { Component } from 'react';
import Navbar from './Navbar'
import Upload from './Upload';
import Projects from './Projects';
import User from './User';
import Block from './Block';


class Main extends Component {

  render() {
    return (
      <div>
        <Navbar
          isLogged={this.props.isLogged}
          currentUser={this.props.currentUser}
          users={this.props.users}
          showUpl={this.props.showUpl}
          showProj={this.props.showProj}
          showChain={this.props.showChain}
          showUser={this.props.showUser}
          account={this.props.account}
        />
        {this.props.isLogged
          ?
          <div className="container-fluid mt-1  text-center">
            { // eslint-disable-next-line
              this.props.users.map((user, key) => {
                if (key === this.props.currentUser)
                  return (
                    <div>
                      {this.props.account === user.walAdd ?
                        this.props.tab === 1 ?
                          <Upload
                            currentUser={this.props.currentUser}
                            captureProject={this.props.captureProject}
                            uploadProj={this.props.uploadProj}
                          /> :
                          this.props.tab === 2 ?
                            <Projects
                              account={this.props.account}
                              currentUser={this.props.currentUser}
                              projects={this.props.projects}
                            />
                            : this.props.tab === 3 ?
                              <Block
                                projects={this.props.projects}
                                chain={this.props.chain}
                              />
                              :
                              <User
                                currentUser={this.props.currentUser}
                                isLogged={this.props.isLogged}
                                projects={this.props.projects}
                                users={this.props.users}
                                regUser={this.props.regUser}
                                login={this.props.login}
                                logout={this.props.logout}
                                account={this.props.account}
                              />
                        : <div><br></br>Please choose your currect wallet and reload this page<br></br><br></br>
                          You've connected to <p className='text-muted'>{this.props.account}</p><br></br>
                          Your profile wallet is <p className='text-muted'>{ // eslint-disable-next-line
                          this.props.users.map((user, key) => {
                            if (key === this.props.currentUser)
                              return (
                                <p key={key}>{user.walAdd}</p>
                              )
                          })}
                          </p>
                        </div>
                      }
                    </div>
                  )
              })
            }
          </div>
          : <User
            currentUser={this.props.currentUser}
            isLogged={this.props.isLogged}
            projects={this.props.projects}
            users={this.props.users}
            regUser={this.props.regUser}
            login={this.props.login}
            logout={this.props.logout}
            account={this.props.account}
          />
        }
      </div>
    );
  }
}

export default Main;