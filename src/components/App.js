import ProjectChain from '../abis/ProjectChain.json'
import React, { Component } from 'react';
import Main from './Main';
import Web3 from 'web3';
import './App.css';

const ipfsClient = require('ipfs-http-client');


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {

    const web3 = window.web3;

    //Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = ProjectChain.networks[networkId]
    if (networkData) {
      // Assign contract
      const projectchain = new web3.eth.Contract(ProjectChain.abi, networkData.address)
      this.setState({ projectchain })
      // Get projects amount
      const projCount = await projectchain.methods.projCount().call()
      this.setState({ projCount })
      // Load projects&sort by the newest
      for (var i = projCount; i >= 1; i--) {
        const project = await projectchain.methods.projects(i).call()
        this.setState({
          projects: [...this.state.projects, project]
        })
      }
      const userCount = await projectchain.methods.userCount().call()
      this.setState({ userCount })
      for (var j = userCount; j >= 1; j--) {
        const user = await projectchain.methods.users(j).call()
        this.setState({
          users: [...this.state.users, user]
        })
      }
      // const currentUser = await projectchain.methods.currentUser().call()
      // this.setState({ currentUser })
      // window.alert('currUser ' + this.state.currentUser)
      // window.alert('totUser ' + this.state.userCount)
    } else {

      window.alert('ProjectChain contract not deployed to detected network.')
    }
    this.setState({ loading: false })
  }

  captureProject = event => {
    event.preventDefault()

    const project = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(project)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: project.type
      })
      console.log('buffer', this.state.buffer)
    }
  }

  //Upload Project
  uploadProj = (description, projname) => {

    const projectId = '2HkrIDtexPEboZTcRPydfz009l1';
    const projectSecret = '167dd9baab474022ca3ced2fc678e09f';
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const ipfs = ipfsClient({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });
    console.log("Submitting project to IPFS...")

    ipfs.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error(error)
        return
      }
      console.log('IPFS result', result);

      this.setState({ loading: true })
      if (this.state.type === '') {
        this.setState({ type: 'none' })
      }
      this.state.projectchain.methods.uploadProj(result[0].hash, result[0].size, this.state.type, projname, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
          loading: false,
          type: null,
          name: null
        })
        window.location.reload()
      }).on('error', (e) => {
        window.alert('Error')
        this.setState({ loading: false })
      })
    })
  }
  regUser = (uname, pwd) => {
    this.state.projectchain.methods.regUser(uname, pwd).send({ from: this.state.account }).on('transactionHash', (hash) => {
      window.location.reload()
    }).on('error', (e) => {
      window.alert('Error')
      this.setState({ loading: false })
    })
  }

  // loginUser = (uname, pwd) => {
  //   for (var i = 0; i < this.state.userCount; i++) {
  //     if (this.state.users[i].userName === uname) {
  //       window.alert('name' + this.state.users[i].userName);
  //       window.alert(this.state.users[i].userPwd);
  //       if (this.state.users[i].userPwd === pwd) {
  //         this.state.projectchain.methods.loginUser(this.state.users[i].userId).send({ from: this.state.account }).on('transactionHash', (hash) => {
  //           window.location.reload()
  //           return
  //         }).on('error', (e) => {
  //           window.alert('Error')
  //           this.setState({ loading: false })
  //         })
  //       }
  //     }
  //   }
  // }

  login = (uname, pwd) => {
    for (var i = 0; i < this.state.userCount; i++) {
      if (this.state.users[i].userName === uname) {
        if (this.state.users[i].userPwd === pwd) {
          this.setState({
            isLogged: true,
            currentUser: this.state.users[i].userId,
            tab:1
          })
          window.alert(this.state.users[i].userName+' logged in' );
          return;
        }
        else{
          window.alert('Wrong password for ' + this.state.users[i].userName);
          return;
        }
      }
    }
    window.alert('User does not exist');
  }
  logout = () => {
    if (window.confirm('Do you really wanna logout ?')) {
      this.setState({
        isLogged: false,
        currentUser: 0
      })
    }
  }
  showUpl = () => {
    this.setState({
      tab: 1
    })
  }
  showProj = () => {
    this.setState({
      tab: 2
    })
  }
  showUser = () => {
    this.setState({
      tab: 3
    })
  }
  //Set states
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      projectchain: null,
      projects: [],
      loading: false,
      type: null,
      name: null,
      buffer: null,
      users: [],
      uname: null,
      currentUser:0,
      tab: 0
    }

    //Bind functions
  }

  render() {
    return (
      <div>
        {this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            account={this.state.account}
            upload={this.state.upload}
            projects={this.state.projects}
            currentUser={this.state.currentUser}
            isLogged={this.state.isLogged}
            tab={this.state.tab}
            regUser={this.regUser}
            login={this.login}
            logout={this.logout}
            showUpl={this.showUpl}
            showProj={this.showProj}
            showUser={this.showUser}
            captureProject={this.captureProject}
            uploadProj={this.uploadProj}
          />
        }
      </div>
    );
  }
}

export default App;