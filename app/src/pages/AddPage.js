import { React } from "react";
import AddShipForm from "../components/AddShipForm";
import AddPartForm from "../components/AddPartForm";
import AddRecordForm from "../components/AddRecordForm";

const AddPage = ({ addShip, addPart, addRecord }) => {
  return (
    <div className="page">
      <h1 className="title">ADD</h1>

      <div className="btn-group-vertical">
        <AddShipForm text="Add ship" addFunction={addShip} />
        <AddPartForm text="Add part" addFunction={addPart} />
        <AddRecordForm text="Add record" addFunction={addRecord} />
      </div>
    </div>
  );
};

export default AddPage;
