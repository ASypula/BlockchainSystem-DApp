import React, { useState, useEffect } from 'react';
import { getShipNames } from '../contractCalls';
import global from '../globals';

function ShipsList({value, handleChange}) {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const fetchShips = async () => {
      try {
        let shipNames = await getShipNames(global.contract);
        setShips(shipNames);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchShips();
  }, []);

  return (
    <select 
        value={value}     
        onChange={handleChange}
    >
      <option value="" selected disabled hidden>Choose here</option>
      {ships.map((ship, index) => (
        <option key={index} value={ship}>
          {ship}
        </option>
      ))}
    </select>
  );
}

export default ShipsList;
