import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/buttons.css";
import "./styles/header.css";
import "./styles/page.css";
import "./styles/components.css";
import Web3 from "web3";
import contractABI from "./blockchain/build/contracts/abi.json";

import AboutPage from "./pages/AboutPage";
import AddPage from "./pages/AddPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";

import global from "./globals";
import {
  addShipContract,
  addPartContract,
  addRecordContract,
} from "./contractCalls";

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
const contractAddress = "0xC84e3f7f3B9b14bF4B38db16b3c548A8992F8F1B";

class App extends Component {
  isAuthenticated = false;

  componentDidMount() {
    this.connectWallet();
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    global.account = accounts[0];
    const contractInstance = new web3.eth.Contract(
      contractABI,
      contractAddress
    );
    global.contract = contractInstance;
  }

  async connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected account:", accounts[0]);
        this.isAuthenticated = true;
      } catch (error) {
        console.error("User rejected connection request:", error);
      }
    } else {
      console.error(
        "MetaMask is not installed. Please install it and try again."
      );
    }
  }

  async addShip(shipName) {
    return addShipContract(global.account, global.contract, shipName);
  }

  async addPart(shipName, partName) {
    return addPartContract(global.account, global.contract, shipName, partName);
  }

  async addRecord(shipName, partName, date, descr, file) {
    addRecordContract(
      global.account,
      global.contract,
      shipName,
      partName,
      date,
      descr,
      file
    );
  }

  constructor(props) {
    super(props);
    this.state = { account: "" };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="bg">
          <Header name="PartsChain" />
          <hr />
          <Routes>
            <Route
              path="/"
              // element={this.isAuthenticated ? <HomePage /> : <LoginPage />}
              element={<HomePage />}
            />
            <Route
              path="/add"
              element={
                <AddPage
                  addShip={this.addShip}
                  addPart={this.addPart}
                  addRecord={this.addRecord}
                />
              }
            />
            <Route path="/history" element={<HistoryPage />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
