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

  // TODO: Check file setup
  const [fileContent, setFileContent] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content);
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  // file setup ends

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
              addFunction(chosenShip, chosenPart, date, descr, fileContent);
              console.log(fileContent);
            }}
            id="editmodal"
          >
            <div className="blockInput">
              <label>Ship</label>
              <ShipsList value={chosenShip} handleChange={handleChangeShip} />
            </div>
            <div></div>
            <div className="blockInput">
              <label>Part</label>
              <PartsList
                value={chosenPart}
                handleChange={handleChangePart}
                ship={chosenShip}
              />
            </div>
            <div></div>
            <p>New record CORRECT STYLING</p>
            <div className="blockInput">
              <label>Date</label>
              <input
                type="date"
                id="date"
                onChange={(e) => {
                  setDate(dateToContract(e.target.value));
                }}
              />
            </div>
            <div className="blockInput">
              <label>Description</label>
              <input
                type="text"
                id="descr"
                onChange={(e) => {
                  setDescr(e.target.value);
                }}
              />
            </div>
            {/* TODO: File upload check */}
            <div>
              <input type="file" onChange={handleFileChange} />
            </div>
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
