import React from "react";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Page with Log in request
 * Displayes appropriate message in situations when user:
 *    - does not have MetaMask installed
 *    - cannot connect to blockchain
 *    - is not authorized
 */
const LoginPage = ({ subtitle, msg }) => {
  logger.log("On Login Page");
  return (
    <div className="login">
      <h1 className="title">LOG IN to PARTS CHAIN</h1>
      <h3 className="loginText">{subtitle}</h3>
      <p className="loginText">{msg}</p>
    </div>
  );
};

export default LoginPage;
