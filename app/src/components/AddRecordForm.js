import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import ShipsList from "./ShipsList";
import PartsList from "./PartsList";
import { dateToContract } from "../utils";

function AddRecordForm({ text, addFunction }) {
  const [date, setDate] = useState();
  const [descr, setDescr] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location.reload(false);
  };
  const handleShow = () => setShow(true);

  const [chosenShip, setShip] = useState("");
  const handleChangeShip = (e) => setShip(e.target.value);

  const [chosenPart, setPart] = useState("");
  const handleChangePart = (e) => setPart(e.target.value);

  return (
    <>
      <button className="Button Add" onClick={handleShow}>
        {text}
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addFunction(chosenShip, chosenPart, date, descr);
            }}
            id="editmodal"
          >
            <label>Ship:</label>
            <div>
              <ShipsList value={chosenShip} handleChange={handleChangeShip} />
            </div>

            <label>Part:</label>
            <div>
              <PartsList
                value={chosenPart}
                handleChange={handleChangePart}
                ship={chosenShip}
              />
            </div>

            <label>New record:</label>
            <input
              type="date"
              id="date"
              onChange={(e) => {
                setDate(dateToContract(e.target.value));
              }}
            />
            <input
              type="text"
              id="descr"
              onChange={(e) => {
                setDescr(e.target.value);
              }}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="Button Close" onClick={handleClose}>
            Close
          </button>
          <button className="Button Update" form="editmodal">
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddRecordForm;
