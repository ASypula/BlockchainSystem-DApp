import React, { useState, useEffect } from "react";
import { getLastRecords } from "../contractCalls";
import ShipRecordsTable from "../components/ShipRecordsTable";
import ShipsList from "../components/ShipsList";
import global from "../globals";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Page with all addition options
 * @param   {function} addShip function to be invoked on adding a new ship
 * @param   {function} addPart function to be invoked on adding a new part
 * @param   {function} addRecord function tto be invoked on adding a new record
 */
const HistoryPage = () => {
  logger.log("On History Page");

  // ship for which history will be displayed
  const [chosenShip, setShip] = useState("");
  const handleChangeShip = (e) => {
    setShip(e.target.value);
    resetForm();
  };

  const [partNames, setPartNames] = useState([]);
  const [recentRecords, setRecords] = useState([]);

  const resetForm = () => {
    setPartNames([]);
    setRecords([]);
  };

  useEffect(() => {
    const fetchRecentRecords = async () => {
      try {
        let [parts, latestRecords] = await getLastRecords(
          global.contract,
          chosenShip
        );
        setPartNames(parts);
        setRecords(latestRecords);
        logger.log(
          `All history on parts and records for ship ${chosenShip} loaded successfully.`
        );
      } catch (error) {
        logger.error("History data cannot be loaded");
      }
    };

    fetchRecentRecords();
  }, [chosenShip]);

  return (
    <div className="page">
      <h1 className="title">HISTORY</h1>
      <div className="blockInput">
        <label>Ship</label>
        <ShipsList value={chosenShip} handleChange={handleChangeShip} />
      </div>
      <div>
        <ShipRecordsTable
          ship={chosenShip}
          parts={partNames}
          records={recentRecords}
        />
      </div>
    </div>
  );
};

export default HistoryPage;
