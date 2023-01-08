import ProjectChain from '../abis/ProjectChain.json'
import React, { Component } from "react";
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
      for (var i = 1; i <= projCount; i++) {
        const project = await projectchain.methods.projects(i).call()
        this.setState({
          projects: [...this.state.projects, project]
        })
      }
      const userCount = await projectchain.methods.userCount().call()
      this.setState({ userCount })
      if(userCount===0){
        this.setState({
          isLogged:false
        })
      }
      for (var j = 1; j <= userCount; j++) {
        const user = await projectchain.methods.users(j).call()
        this.setState({
          users: [...this.state.users, user]
        })
      }
      const blockCount = await projectchain.methods.blockCount().call()
      this.setState({ blockCount })
      for (var k = 1; k <= blockCount; k++) {
        var chain = await projectchain.methods.chain(k).call()
        console.log(chain);
        this.setState({
          chain: [...this.state.chain, chain]
        })
    }
      // window.alert('log :' + this.state.isLogged)
    } else {
      window.alert('ProjectChain contract not deployed to detected network.')
    }
    this.setState({ loading: false })
  }

  regUser = (uname, pwd) => {
    for (var i = 0; i < this.state.userCount; i++) {
      if (this.state.users[i].userName === uname) {
        window.alert('Username : ' + uname + ' already exists');
        return;
      }
    }
    this.state.projectchain.methods.regUser(uname, pwd).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({
        isLogged: true,
        currentUser: this.state.userCount,
      }, () => {
        localStorage.setItem('isLogged', this.state.isLogged)
        localStorage.setItem('currentUser', this.state.currentUser)
      });
      window.alert('Registered new user : ' + uname);
      window.location.reload()
    }).on('error', (e) => {
      window.alert('Error')
      this.setState({ loading: false })
    })
  }

  login = (uname, pwd) => {
    for (var i = 0; i < this.state.userCount; i++) {
      if (this.state.users[i].userName === uname) {
        if (this.state.users[i].userPwd === pwd) {
          this.setState({
            isLogged: true,
            currentUser: this.state.users[i].userId - 1,
          }, () => {
            localStorage.setItem('isLogged', this.state.isLogged)
            localStorage.setItem('currentUser', this.state.currentUser)
          });
          window.alert(this.state.users[i].userName + ' logged in');
          window.location.reload()
          // while (this.state.account !== this.state.users[i].address) {
          //   window.alert('Please connect your wallet of this profile !!'+this.state.users[i].address);
          //   window.location.reload()
          // }
          return;
        }
        else {
          window.alert('Wrong password for ' + this.state.users[i].userName);
          window.location.reload()
          return;
        }
      }
    }
    window.alert('User does not exist');
    window.location.reload()
  }

  logout = () => {
    if (window.confirm('Do you really wanna logout ?')) {
      this.setState({
        isLogged: false,
        currentUser: 0,
        tab: 3
      }, () => {
        localStorage.setItem('isLogged', this.state.isLogged)
        localStorage.setItem('currentUser', this.state.currentUser)
      });
      window.location.reload()
    }
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
    // while (this.state.account !== this.state.users[this.state.currentUser].address) {
    //   window.alert('Please connect your wallet of this profile !!');
    //   window.location.reload()
    // }
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
  showChain = () => {
    this.setState({
      tab: 3
    })
  }
  showUser = () => {
    this.setState({
      tab: 4
    })
  }
  //Set states
  constructor(props) {
    super(props);
    var log = localStorage.getItem('isLogged');
    var usr = localStorage.getItem('currentUser');
    this.state = {
      account: '',
      projectchain: null,
      projects: [],
      loading: false,
      type: null,
      name: null,
      buffer: null,
      users: [],
      chain: [],
      uname: null,
      isLogged: false,
      currentUser: +usr,
      tab: 1
    }
    if (log === 'true')
      this.state = {
        ...this.state,
        isLogged: true
      }
    if (log === 'false')
      this.state = {
        ...this.state,
        isLogged: false
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
            chain={this.state.chain}
            users={this.state.users}
            tab={this.state.tab}y
            regUser={this.regUser}
            login={this.login}
            logout={this.logout}
            showUpl={this.showUpl}
            showProj={this.showProj}
            showChain={this.showChain}
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