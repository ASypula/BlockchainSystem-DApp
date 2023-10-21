import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/buttons.css";
import "./styles/header.css";
import "./styles/page.css";
import "./styles/components.css";
import Web3 from "web3";
import dataContractABI from "./blockchain/contractsABI/abi_data.json";
import accountContractABI from "./blockchain/contractsABI/abi_accounts.json";

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
import Logger from "./Logger";

const logger = new Logger();

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

// Addresses of contracts already deployed to blockchain
const contractAddressData = "0x51e528F45Bf155CaD4271772917913ff6d65524f";
const contractAddressAccounts = "0x634Df05591ca09f770C41bc7bc9b89dcA6da9b8f";

/**
 * Main component, enables routing and handles user's connection
 * to blockchain with proper authentication and authorization.
 */
const App = () => {
  // Accounts permitted to access the application
  const [permittedAccounts, setAccounts] = useState("");

  // Contract instance to be used with communication to deployed Account Contract
  const [accountContract, setAccountContract] = useState("");

  // Defines If user wants another log in attempt
  const [tryLogin, setRetryLogin] = useState(true);

  // Title and message displayed on Login Page, depends on the stage of user's authorization
  const [loginTitle, setLoginTitle] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  useEffect(() => {
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
        logger.error("Error:", error);
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
        logger.log("Connected account:", accounts[0]);
      } catch (error) {
        setLoginTitle("Connection to blockchain has to be established.");
        setLoginMsg(
          "Please first connect to your blockchain account and proceed with logging in.\nThen enjoy the PartsChain!"
        );
        logger.error("User rejected connection request:", error);
      }
    } else {
      setLoginTitle("MetaMask is required to use the system.");
      setLoginMsg(
        "Please first install MetaMask and proceed with logging in.\nThen enjoy the PartsChain!"
      );
      logger.error(
        "MetaMask is not installed. Please install it and try again."
      );
    }
  }

  async function authenticate() {
    if (permittedAccounts.includes(global.account)) {
      global.isAuthorized = true;
      logger.log("User authorized");
    } else {
      setLoginTitle("Authorization required.");
      setLoginMsg(
        "Your account cannot be authorized. Please contact your manager and receive necessary permissions.\nThen enjoy the PartsChain!"
      );
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

  if (global.isAuthorized) {
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
      <div className="page-login">
        <LoginPage subtitle={loginTitle} msg={loginMsg} />
        <button className="Retry" onClick={retryLogin}>
          {" "}
          Log in{" "}
        </button>
      </div>
    );
  }
};

export default App;
