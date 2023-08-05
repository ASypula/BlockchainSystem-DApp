import React from "react";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Page with description of the application PartsChain
 */
const AboutPage = () => {
  logger.log("On About Page");
  return (
    <div className="page">
      <h1 className="title">PARTS CHAIN</h1>
    </div>
  );
};

export default AboutPage;
