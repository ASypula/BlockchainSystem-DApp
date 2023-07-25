import React, { Component, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/buttons.css';
import './styles/header.css';
import './styles/page.css';
import Web3 from 'web3';
import contractABI from './blockchain/build/contracts/s1.json';

import AboutPage from './pages/AboutPage';
import AddPage from './pages/AddPage';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';

import global from './globals';
import { addShipContract, addPartContract } from './contractCalls';

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
const contractAddress = '0xfb920e5A1E68476b240d777527Eb60604CC7E195';

class App extends Component {

  componentDidMount() {
    this.connectWallet();
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    global.account = accounts[0];
    const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
    global.contract = contractInstance;
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

  async addShip(name){
    addShipContract(global.account, global.contract, name);
  }

  async addPart(shipName, partName){
    addPartContract(global.account, global.contract, shipName, partName);
  }


  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

  render() {
    return (
      <BrowserRouter>
        <div className='bg'>
          <Header name="PartsChain"/>
          <hr />
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/add" element={<AddPage addFunction={this.addShip} addShip={this.addShip} addPart={this.addPart}/>}/>
            <Route exact path="/history" element={<HistoryPage/>}/>
            <Route exact path="/about" element={<AboutPage/>}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
        </div> 
      </BrowserRouter>
  );
  }
}

export default App;
