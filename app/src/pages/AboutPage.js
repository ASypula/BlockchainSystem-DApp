import React from "react";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Page with description of the application PartsChain
 */
const AboutPage = () => {
  logger.log("On About Page");
  return (
    <div className="page descr">
      <h1 className="title">PartsChain</h1>
      <h2 className="descr1">
        PartsChain - blockchain-enabled system for ship parts tracking and
        maintenance
      </h2>
      <p className="descr1">
        Most important features include:
        <ul>
          <li>Immutable Records</li>
          <li>Transparent History</li>
          <li>Tamper-Proof Guarantee</li>
          <li>Blockchain-Powered Security</li>
          <li>Effortless Accessibility</li>
          <li>Advanced Inspection & Monitoring</li>
        </ul>
      </p>
    </div>
  );
};

export default AboutPage;
