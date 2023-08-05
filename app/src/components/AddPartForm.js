import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ErrorModal from "./ErrorModal";
import ShipsList from "./ShipsList";
import Logger from "../Logger";

const logger = new Logger();

function AddPartForm({ text, addFunction }) {
  const [name, setName] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setName("");
    setShip("");
  };
  const handleShow = () => setShow(true);

  // error msg
  const [errorMsg, setErrorMsg] = useState("");
  // is the error modal displayed
  const [showError, setShowError] = useState(false);

  const [chosenShip, setShip] = useState("");
  const handleChange = (e) => setShip(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFunction(chosenShip, name);
      logger.log(`New part ${name} added to ship ${chosenShip} to blockchain.`);
      // const result = await addFunction(name).catch(err=>console.log(err));
    } catch (err) {
      setShowError(true);
      setErrorMsg("Not possible to add this part name.");
      console.error("Error in adding part");
    }
    handleClose();
  };

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
    </>
  );
}

export default AddPartForm;
