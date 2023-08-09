import React, { useState, useEffect } from "react";
import { getShipPartNames } from "../contractCalls";
import global from "../globals";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Dynamically updating list of given ship's parts
 * @param   {string} value part chosen by the user, to be passed to the parent component
 * @param   {function} handleChange function invoked after choosing a part
 * @param   {string} ship ship for which list of parts should be loaded
 * @return  select with all available parts' names for given ship
 */
function PartsList({ value, handleChange, ship }) {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        let partNames = await getShipPartNames(global.contract, ship);
        setParts(partNames);
        logger.log(`List of parts for ship ${ship} loaded successfully`);
      } catch (error) {
        logger.error(`List of parts for ship ${ship} cannot be provided.`);
        logger.error(error);
      }
    };

    fetchParts();
  }, [ship]);

  return (
    <select className="custom-select" value={value} onChange={handleChange}>
      <option disabled value="">
        Select
      </option>
      {parts.map((part, index) => (
        <option key={index} value={part}>
          {part}
        </option>
      ))}
    </select>
  );
}

export default PartsList;
