import Modal from "react-bootstrap/Modal";

/**
 * Modal displaying information message
 * @param   {boolean} showInfo if the modal should be displayed
 * @param   {function} setShowInfo function to change visiblity of modal
 * @param   {string} infoMessage text of the information message
 * @return  modal with information message e.g. successful addition of a record
 */
function InfoModal({ showInfo, setShowInfo, infoMessage }) {
  const handleClose = () => setShowInfo(false);

  return (
    <Modal
      show={showInfo}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>{infoMessage}</label>
      </Modal.Body>
      <Modal.Footer>
        <button className="Button Close" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;
