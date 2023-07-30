import Modal from "react-bootstrap/Modal";

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
