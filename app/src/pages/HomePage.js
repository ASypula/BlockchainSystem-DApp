import React from "react";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Page with main information on PartsChain
 */
const HomePage = () => {
  logger.log("On Home Page");
  return (
    <div className="page descr">
      <h1 className="title">HOME</h1>
      <h2 className="descr descr1">
        PartsChain - blockchain-enabled system for ship parts tracking and
        maintenance
      </h2>
      <p className="descr descr1">
        Are you looking for a system that will provide secure and transparent
        tracking for ship parts, ensuring streamlined maintenance processes?
        Look no further than our blockchain-enabled solution tailored
        specifically for the maritime industry. Our cutting-edge system is
        designed to revolutionize the way ship parts are managed, offering a
        comprehensive and efficient approach to tracking and maintenance. With
        the power of blockchain technology at its core, our system ensures the
        integrity and traceability of every part, enhancing the overall safety
        and reliability of your vessel. Experience a seamless and accountable
        maintenance workflow, with real-time updates and secure data management,
        all integrated into one cohesive platform. Join us in redefining the
        future of ship part management with our innovative and reliable
        blockchain-based system.
      </p>
    </div>
  );
};

export default HomePage;
