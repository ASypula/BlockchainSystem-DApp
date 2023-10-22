import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ErrorModal from "./ErrorModal";
import InfoModal from "./InfoModal";
import Logger from "../Logger";

const logger = new Logger();

/**
 * Form for adding a new ship to the database
 * @param   {string} text text to be displayed on the Add button
 * @param   {function} addFunction function to be invoked to add new ship
 * @return  modal with ship adding form
 */
function AddShipForm({ text, addFunction }) {
  // name of the ship
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setShowError(true);
      setErrorMsg("Ship name cannot be empty.");
      logger.error("Ship name cannot be empty in ship addition");
    } else {
      try {
        await addFunction(name);
        setShowInfo(true);
        setInfoMsg(`Ship ${name} added successfully.`);
        logger.log(`New ship ${name} added to blockchain.`);
      } catch (err) {
        setShowError(true);
        setErrorMsg("Not possible to add this ship name.");
        logger.error("Error in adding ship");
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
          <Modal.Title>Add ship</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} id="editmodal">
            <div className="blockInput">
              <label>Name</label>
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

export default AddShipForm;
