import React, { useState, useEffect } from "react";
import { getLastRecords } from "../contractCalls";
import ShipRecordsTable from "../components/ShipRecordsTable";
import ShipsList from "../components/ShipsList";
import global from "../globals";

const HistoryPage = () => {
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
      } catch (error) {
        console.error("Error:", error);
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
        <ShipRecordsTable parts={partNames} records={recentRecords} />
      </div>
    </div>
  );
};

export default HistoryPage;
