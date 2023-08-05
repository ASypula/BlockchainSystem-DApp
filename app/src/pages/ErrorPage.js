import React from "react";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Default Error Page
 */
const ErrorPage = () => {
  logger.log("On Error Page");
  return (
    <div className="page">
      <h1 className="title">ERROR</h1>
    </div>
  );
};

export default ErrorPage;
