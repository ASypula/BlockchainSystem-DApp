import { React } from "react";
import { dateFromContract, downloadFile } from "../utils";
import Logger from "../Logger";

const logger = new Logger();

// Headers of core information about each record displayed in the table
const recordDetails = ["Date", "Description", "File"];

/**
 * Dynamically updating table with information on maintenace
 * records for given ship's parts
 * @param   {list} records sorted list of records so that each entry pertains to equivalent list index of the parts list
 * @return  table with data about maintenance records
 */
function PartHistoryTable({ records }) {
  const generateFile = (index) => {
    return new Blob([records[index].file], { type: "text/plain" });
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
            {recordDetails.map(function (label) {
              return <th>{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {records.map((name, index) => {
            return (
              <tr key={index}>
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

export default PartHistoryTable;
