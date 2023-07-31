import React, { useState, useEffect } from "react";
import { getShipPartNames } from "../contractCalls";
import global from "../globals";

function PartsList({ value, handleChange, ship }) {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        let partNames = await getShipPartNames(global.contract, ship);
        setParts(partNames);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchParts();
  }, [ship]);

  return (
    <select value={value} onChange={handleChange}>
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
