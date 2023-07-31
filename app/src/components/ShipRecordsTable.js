import React from "react";
import { dateFromContract } from "../utils";

const shipDetails = ["Part", "Date", "Description", "File"];

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
