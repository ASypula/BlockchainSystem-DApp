import React from "react";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Page with all addition options
 */
const HomePage = () => {
  logger.log("On Home Page");
  return (
    <div className="page">
      <h1 className="title">HOME</h1>
      <h2>
        Experience Unparalleled Security with Our Blockchain-Powered Solution!
      </h2>
      <p className="descr">
        Is Your Company Prioritizing Client and Employee Safety in the Transport
        Industry?
      </p>
      <p className="descr">
        🛡️ We understand the paramount importance of ensuring the utmost safety
        for your clients and employees, especially in the transport sector.
        Whether it's passengers and drivers in the land transport or pilots and
        captains navigating the skies and seas, maintaining the highest security
        standards is non-negotiable.
      </p>
      <h3>✅ Advanced Inspection & Monitoring </h3>
      <p className="descr">
        {" "}
        Our solution goes beyond routine inspections – we believe in meticulous
        scrutiny of mechanisms to ensure flawless functionality. Regular checks
        are complemented by comprehensive historical tracking, providing you
        with a complete overview of crucial parts' performance over time.{" "}
      </p>
      <h3>🔒 Blockchain-Powered Security </h3>{" "}
      <p className="descr">
        In an era where data integrity is paramount, we present an innovative
        solution – harnessing the power of blockchain technology. Say goodbye to
        worries about data modification or corruption. Our decentralized
        application built on blockchain guarantees:
      </p>
      <h3>📜 Immutable Records</h3>
      <p className="descr">
        Every piece of data is etched onto the blockchain, creating an
        unalterable record. No more concerns about tampering or unauthorized
        alterations.
      </p>
      <h3>🔍 Transparent History</h3>{" "}
      <p className="descr">
        {" "}
        Gain full visibility into the history of your data. Easily trace every
        change made, enabling you to pinpoint any modifications.
      </p>
      <h3>🚫 Tamper-Proof Guarantee</h3>
      <p className="descr">
        Deleting records or overwriting data without a trace? Not possible with
        our solution. Every action is permanently etched into the blockchain.
      </p>{" "}
      <h3>📊 Effortless Accessibility</h3>
      <p className="descr">
        Access data history at your fingertips. Make informed decisions with a
        comprehensive understanding of past changes. Are you ready to elevate
        your company's safety standards and embrace the future of data security?
        Visit www.YourWebsite.com to explore how our blockchain-powered
        decentralized application can revolutionize your approach to safety and
        data integrity.
      </p>{" "}
      <p className="descr">Safety first, always! YourCompanyLogo</p>
    </div>
  );
};

export default HomePage;
