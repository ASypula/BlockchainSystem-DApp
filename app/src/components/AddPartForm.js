import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ErrorModal from "./ErrorModal";
import InfoModal from "./InfoModal";
import ShipsList from "./ShipsList";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Form for adding a new part to a ship
 * @param   {string} text text to be displayed on the Add button
 * @param   {function} addFunction function to be invoked to add new ship
 * @return  modal with part adding form
 */
function AddPartForm({ text, addFunction }) {
  // name of the part
  const [name, setName] = useState();
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
    setName("");
    setShip("");
  };
  const handleShow = () => setShow(true);

  // ship to which new part should be added
  const [chosenShip, setShip] = useState("");
  const handleChange = (e) => setShip(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chosenShip.length === 0) {
      setShowError(true);
      setErrorMsg("Ship has to be chosen.");
      logger.error("One ship has to be chosen in part addition");
    } else if (typeof name === "undefined" || name.length === 0) {
      setShowError(true);
      setErrorMsg("Part name cannot be empty.");
      logger.error("Part name cannot be empty in part addition");
    } else {
      try {
        await addFunction(chosenShip, name);
        setShowInfo(true);
        setInfoMsg(
          `Part ${name} added successfully to the ship ${chosenShip}.`
        );
        logger.log(
          `New part ${name} added to ship ${chosenShip} to blockchain.`
        );
      } catch (err) {
        setShowError(true);
        setErrorMsg(
          `Not possible to add ${name}. New part name for the ship ${chosenShip} must be unique.`
        );
        logger.error("Error in adding part");
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
          <Modal.Title>Add ship's part</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} id="editmodal">
            <div className="blockInput">
              <label>Ship</label>
              <ShipsList value={chosenShip} handleChange={handleChange} />
            </div>
            <div className="blockInput">
              <label>New part</label>
              <input
                type="text"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
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

export default AddPartForm;
