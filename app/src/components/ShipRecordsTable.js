import { React, useState } from "react";
import { dateFromContract, downloadFile } from "../utils";
import Logger from "../Logger";
import DetailPartHistoryModal from "./DetailPartHistoryModal";

const logger = new Logger();

// Headers of core information about each record displayed in the table
const shipDetails = ["Part", "Date", "Description", "File", "Info"];

/**
 * Dynamically updating table with information on maintenace
 * records for given ship's parts
 * @param   {text} ship chosen ship
 * @param   {list} parts list of parts for a given ship
 * @param   {list} records sorted list of records so that each entry pertains to equivalent list index of the parts list
 * @return  table with data about maintenance records
 */
function ShipRecordsTable({ ship, parts, records }) {
  // is the detail part's history modal displayed
  const [showDetails, setShowDetails] = useState(false);

  const [chosenPart, setChosenPart] = useState("");

  const generateFile = (index) => {
    return new Blob([records[index].file], { type: "text/plain" });
  };

  const handleDownload = (index) => {
    const blob = generateFile(index);
    downloadFile(blob, "report.txt");
    logger.log("File downloaded successfully");
  };

  const displayHistory = (partName) => {
    setChosenPart(partName);
    setShowDetails(true);
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
                <td>
                  {" "}
                  <button onClick={() => displayHistory(partName)}>
                    {"details"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        <DetailPartHistoryModal
          shipName={ship}
          partName={chosenPart}
          show={showDetails}
          setShow={setShowDetails}
        />
      }
    </div>
  );
}

export default ShipRecordsTable;
