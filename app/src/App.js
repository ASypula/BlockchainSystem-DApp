import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Web3 from 'web3'
import './App.css'
import contractABI from './blockchain/build/contracts/s1.json';

import Home from './pages/Home';
import Error from './pages/Error';
import Header from './components/Header';

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0xb29FDDCB9C5BB2ff5C0cDFe31DEB6C727E899aFf';

class App extends Component {
  // componentWillMount() {
  //   this.connectWallet()
  //   this.tryContract()
  //   //this.loadBlockchainData()
  // }

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
    const result = await contractInstance.methods.foo("one").call();
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
          <Header/>
          <hr />
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/about" element={<Error/>}/>
            <Route exact path="/error" element={<Error/>}/>
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