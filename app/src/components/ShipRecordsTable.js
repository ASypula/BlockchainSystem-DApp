import React, { useEffect, useState } from "react";
import { getLastRecords } from "../contractCalls";
import { dateFromContract } from "../utils";
import global from "../globals";

const shipDetails = ["Part", "Date", "Description"];

function ShipRecordsTable({ shipName }) {
  console.log(shipName);

  const [partNames, setPartNames] = useState([]);
  const [recentRecords, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecentRecords = async () => {
      try {
        let [parts, latestRecords] = await getLastRecords(
          global.contract,
          shipName
        );
        console.log("In records fetching");
        setPartNames(parts);
        setRecords(latestRecords);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRecentRecords();
  }, [shipName]);

  return (
    <div>
      <table className="recordsTable">
        <tr>
          {shipDetails.map(function (label) {
            return <th>{label}</th>;
          })}
        </tr>
        {partNames.map((partName, index) => {
          return (
            <tr key={index}>
              <td>{partName}</td>
              <td>{dateFromContract(recentRecords[index].date)}</td>
              <td>{recentRecords[index].descr}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default ShipRecordsTable;
