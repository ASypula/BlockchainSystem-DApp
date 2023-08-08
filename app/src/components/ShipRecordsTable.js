import React from "react";
import { dateFromContract } from "../utils";
import Logger from "../Logger";

const logger = new Logger();

// Headers of core information about each record displayed in the table
const shipDetails = ["Part", "Date", "Description", "File"];

/**
 * Dynamically updating table with information on maintenace
 * records for given ship's parts
 * @param   {list} parts list of parts for a given ship
 * @param   {list} records sorted list of records so that each entry pertains to equivalent list index of the parts list
 * @return  table with data about maintenance records
 */
function ShipRecordsTable({ parts, records }) {
  const generateFile = (index) => {
    return new Blob([records[index].file], { type: "text/plain" });
  };

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleDownload = (index) => {
    const blob = generateFile(index);
    downloadFile(blob, "report.txt");
    logger.log("File downloaded successfully");
  };

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
                <td>
                  {" "}
                  <button onClick={() => handleDownload(index)}>
                    {"download"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ShipRecordsTable;
