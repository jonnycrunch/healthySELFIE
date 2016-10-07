import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

import { Uport } from 'uport-lib'

import Web3 from 'web3'

class App extends Component {
    componentWillMount () {
    let rpcUrl = 'https://consensysnet.infura.io:8545'
    let web3 = new Web3()
    let options = {
      ipfsProvider: {
        host: 'ipfs.infura.io',
        port: '5001',
        protocol: 'https',
        root: ''
      }
    }
    let uport = new Uport('HealthySELFIE', options)
    let uportProvider = uport.getUportProvider(rpcUrl)
    web3.setProvider(uportProvider)

    this.getCoinbase = function () {
      web3.eth.getCoinbase(function (err, address) {
        if (err) { throw err }
        console.log('address: ' + address)
        web3.eth.defaultAccount = address

        uport.getUserPersona().then((userPersona) => {
          let profile = userPersona.getProfile()
          console.log(profile)
        })
      })
    }
  }
  
  componentDidMount () {
    this.getCoinbase()
  }
  
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to uPort</h2>
        </div>
        <p className='App-intro'>To get started, edit <code>src/App.js</code> and save to reload.</p>
      </div>
    )
  }
  
}

export default App;
