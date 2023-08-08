import Modal from "react-bootstrap/Modal";

/**
 * Modal displaying error message
 * @param   {boolean} showError if the modal should be displayed
 * @param   {function} setShowError function to change visiblity of modal
 * @param   {string} errorMessage text of the error message
 * @return  modal with error message
 */
function ErrorModal({ showError, setShowError, errorMessage }) {
  const handleClose = () => setShowError(false);

  return (
    <Modal
      show={showError}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>{errorMessage}</label>
      </Modal.Body>
      <Modal.Footer>
        <button className="Button Close" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
