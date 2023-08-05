import React from "react";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Page with all addition options
 */
const HomePage = () => {
  logger.log("On Home Page");
  return (
    <div className="container">
      <h1>Home</h1>
      <p>Your account: </p>
    </div>
  );
};

export default HomePage;
