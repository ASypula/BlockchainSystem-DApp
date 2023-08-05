import React, { useState, useEffect } from "react";
import { getShipNames } from "../contractCalls";
import global from "../globals";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Dynamically updating list of stored ships
 * @param   {string} value ship chosen by the user, to be passed to the parent component
 * @param   {function} handleChange function invoked after choosing a ship
 * @return  select with all available ships' names as options
 */
function ShipsList({ value, handleChange }) {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const fetchShips = async () => {
      try {
        let shipNames = await getShipNames(global.contract);
        setShips(shipNames);
        logger.info("List of ships loaded successfully");
      } catch (error) {
        logger.error("List of ships cannot be provided.");
        logger.error(error);
      }
    };

    fetchShips();
  }, []);

  return (
    <select value={value} onChange={handleChange}>
      <option disabled value="">
        Select
      </option>
      {ships.map((ship, index) => (
        <option key={index} value={ship}>
          {ship}
        </option>
      ))}
    </select>
  );
}

export default ShipsList;
