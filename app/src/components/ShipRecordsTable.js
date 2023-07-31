import React from "react";
import { dateFromContract } from "../utils";

const shipDetails = ["Part", "Date", "Description"];

function ShipRecordsTable({ parts, records }) {
  return (
    <div>
      <table className="recordsTable">
        <thead>
          <tr>
            {shipDetails.map(function (label) {
              return <th>{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {parts.map((partName, index) => {
            return (
              <tr key={index}>
                <td>{partName}</td>
                <td>{dateFromContract(records[index].date)}</td>
                <td>{records[index].descr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ShipRecordsTable;
