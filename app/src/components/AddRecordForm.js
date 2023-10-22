import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import ShipsList from "./ShipsList";
import PartsList from "./PartsList";
import ErrorModal from "./ErrorModal";
import InfoModal from "./InfoModal";
import { dateToContract } from "../utils";

import Logger from "../Logger";

const logger = new Logger();

/**
 * Form for adding a new maintenance record about a ship's part
 * @param   {string} text text to be displayed on the Add button
 * @param   {function} addFunction function to be invoked to add new ship
 * @return  modal with record adding form
 */
function AddRecordForm({ text, addFunction }) {
  // date and description required to submit a new record
  const [date, setDate] = useState();
  const [descr, setDescr] = useState();

  // is the modal form visible
  const [show, setShow] = useState(false);

  //error msg
  const [errorMsg, setErrorMsg] = useState("");
  // is the error modal displayed
  const [showError, setShowError] = useState(false);

  //info msg
  const [infoMsg, setInfoMsg] = useState("");
  // is the info modal displayed
  const [showInfo, setShowInfo] = useState(false);

  const handleClose = () => {
    setShow(false);
    resetForm();
    //TODO: setShip("");
  };
  const handleShow = () => setShow(true);

  const resetForm = () => {
    setPart("");
    setDate("");
    setDescr("");
    setFileContent("");
  };

  const [chosenShip, setShip] = useState("");
  const handleChangeShip = (e) => {
    setShip(e.target.value);
    resetForm();
  };

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
      logger.log("File content successfully loaded");
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  // file setup ends

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chosenShip.length === 0) {
      setShowError(true);
      setErrorMsg("Ship has to be chosen.");
      logger.error("Ship name missing in record addition");
    } else if (chosenPart.length === 0) {
      setShowError(true);
      setErrorMsg("Part has to be chosen.");
      logger.error("Part name missing in record addition");
    } else if (date.length === 0) {
      setShowError(true);
      setErrorMsg("Date has to be chosen.");
      logger.error("Date missing in record addition");
    } else if (descr.length === 0) {
      setShowError(true);
      setErrorMsg("Some description of the record has to be provided.");
      logger.error("Description missing in record addition");
    } else {
      try {
        await addFunction(chosenShip, chosenPart, date, descr, fileContent);
        setShowInfo(true);
        setInfoMsg(`Record for part ${chosenPart} added successfully.`);
        logger.log(`New record for part ${chosenPart} added to blockchain.`);
      } catch (err) {
        setShowError(true);
        setErrorMsg("Not possible to add this record.");
        logger.error("Error in adding new record");
      }
    }

    handleClose();
  };

  return (
    <>
      <button className="Button main" onClick={handleShow}>
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
          <form onSubmit={handleSubmit} id="editmodal">
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
      {
        <ErrorModal
          showError={showError}
          setShowError={setShowError}
          errorMessage={errorMsg}
        />
      }
      {
        <InfoModal
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          infoMessage={infoMsg}
        />
      }
    </>
  );
}

export default AddRecordForm;
