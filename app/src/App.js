import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Web3 from 'web3'
import './App.css'
import contractABI from './blockchain/build/contracts/copied_abi.json';

import Home from './components/Home';
import Error from './components/Error';
import Navigation from './components/Navigation';

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0x8DDC96f3418318b9E88E0fA1BCda0cedbaf4152b';

class App extends Component {
  componentWillMount() {
    this.connectWallet()
    this.tryContract()
    //this.loadBlockchainData()
  }

  async loadBlockchainData() {
    // const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  async connectWallet() {
    
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected account:', accounts[0]);
      } catch (error) {
        console.error('User rejected connection request:', error);
      }
    } else {
      console.error('MetaMask is not installed. Please install it and try again.');
    }
  }

  async tryContract(){
    const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const result = await contractInstance.methods.fun2("Hello2!").call();
    console.log('Magic casted:', result);
  }

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

  render() {
    return (

          <BrowserRouter>
          <div>
            <Navigation />
              <Routes>
               <Route path="/" element={<Home/>}/>
              <Route element={<Error/>}/>
             </Routes>
          </div> 
        </BrowserRouter>
    );
  }
}

export default App;

{/* <div className="container">
<h1>Home</h1>
<p>Your account: </p>
<p>Your account: {this.state.account}</p>
</div> */}