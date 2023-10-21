import { React } from "react";
import AddShipForm from "../components/AddShipForm";
import AddPartForm from "../components/AddPartForm";
import AddRecordForm from "../components/AddRecordForm";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Page with all addition options
 * @param   {function} addShip function to be invoked on adding a new ship
 * @param   {function} addPart function to be invoked on adding a new part
 * @param   {function} addRecord function tto be invoked on adding a new record
 */
const AddPage = ({ addShip, addPart, addRecord }) => {
  logger.log("On Add Page");
  return (
    <div className="page">
      <h1 className="title">ADD</h1>
      <p className="descr informMsg">
        On this page you can add a new ship, add a new part to an exisiting ship
        or add a new maintenance record.
      </p>

      <div className="btn-group-vertical">
        <AddShipForm text="Add ship" addFunction={addShip} />
        <AddPartForm text="Add part" addFunction={addPart} />
        <AddRecordForm text="Add record" addFunction={addRecord} />
      </div>
    </div>
  );
};

export default AddPage;
