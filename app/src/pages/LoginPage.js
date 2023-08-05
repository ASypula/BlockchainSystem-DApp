import React from "react";
import Logger from "../Logger";

const logger = new Logger();

/**
 * TODO Page with
 */
const LoginPage = () => {
  logger.log("On Login Page");
  return (
    <div className="page">
      <h1 className="title">LOG IN to PARTS CHAIN</h1>
      <p>Please connect first to blockchain e.g. to MetaMask</p>
    </div>
  );
};

export default LoginPage;
