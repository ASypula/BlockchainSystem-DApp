import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/buttons.css";
import "./styles/header.css";
import "./styles/page.css";
import "./styles/components.css";
import Web3 from "web3";
import dataContractABI from "./blockchain/build/contracts/abi_data.json";
import accountContractABI from "./blockchain/build/contracts/abi_accounts.json";

import AboutPage from "./pages/AboutPage";
import AddPage from "./pages/AddPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";

import global from "./globals";
import {
  getPermittedAccounts,
  addShipContract,
  addPartContract,
  addRecordContract,
} from "./contractCalls";

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
const contractAddressData = "0x39D8ddBA129C02953Faa90DC7b48B5Fb4954FE2d";
const contractAddressAccounts = "0x1E2917399767E0f743888C3064c18c48e051302B";

const App = () => {
  const [permittedAccounts, setAccounts] = useState("");
  const [accountContract, setAccountContract] = useState("");
  const [tryLogin, setRetryLogin] = useState(true);

  useEffect(() => {
    console.log(global.isAuthenticated);
    connectBlockchain();
    loadBlockchainData().then((result) => loadPermittedAccounts(result));
  }, [tryLogin]);

  async function loadPermittedAccounts() {
    getPermittedAccounts(accountContract, global.account)
      .then((accounts) => {
        if (accounts) {
          setAccounts(accounts);
          authenticate();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function loadBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    global.account = accounts[0];
    const contractInstance = new web3.eth.Contract(
      dataContractABI,
      contractAddressData
    );
    const contractAccounts = new web3.eth.Contract(
      accountContractABI,
      contractAddressAccounts
    );
    global.contract = contractInstance;
    setAccountContract(contractAccounts);
    return accounts[0];
  }

  async function connectBlockchain() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected account:", accounts[0]);
      } catch (error) {
        console.error("User rejected connection request:", error);
      }
    } else {
      console.error(
        "MetaMask is not installed. Please install it and try again."
      );
    }
  }

  async function authenticate() {
    if (permittedAccounts.includes(global.account)) {
      global.isAuthenticated = true;
      console.log("Authenticated");
    }
  }

  async function addShip(shipName) {
    return addShipContract(global.account, global.contract, shipName);
  }

  async function addPart(shipName, partName) {
    return addPartContract(global.account, global.contract, shipName, partName);
  }

  async function addRecord(shipName, partName, date, descr, file) {
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

  function retryLogin() {
    setRetryLogin(!tryLogin);
  }

  if (global.isAuthenticated) {
    return (
      <BrowserRouter>
        <div className="bg">
          <Header name="PartsChain" />
          <hr />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/add"
              element={
                <AddPage
                  addShip={addShip}
                  addPart={addPart}
                  addRecord={addRecord}
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
  } else {
    return (
      <div>
        <LoginPage />;
        <button className="Retry" onClick={retryLogin}>
          {" "}
          Log in{" "}
        </button>
      </div>
    );
  }
};

export default App;
